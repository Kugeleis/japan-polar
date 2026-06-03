const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const TRIP_DIR = path.join(__dirname, '../public/trip');
const OUTPUT_FILE = path.join(__dirname, '../public/media-manifest.json');

async function getFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter(file => {
        const filePath = path.join(dir, file);
        return fs.statSync(filePath).isFile() && !file.includes('_thumb.');
    });
}

async function ensureThumbnail(filePath) {
    const ext = path.extname(filePath);
    const base = filePath.slice(0, -ext.length);
    const thumbPath = `${base}_thumb${ext}`;

    if (!fs.existsSync(thumbPath)) {
        console.log(`Generating thumbnail for ${path.basename(filePath)}...`);
        try {
            await sharp(filePath)
                .resize(400, 400, { fit: 'inside', withoutEnlargement: true })
                .toFile(thumbPath);
        } catch (err) {
            console.error(`Failed to generate thumbnail for ${filePath}:`, err);
            return null;
        }
    }
    return thumbPath;
}

async function run() {
    const manifest = {};
    const trips = fs.readdirSync(TRIP_DIR);

    for (const tripDir of trips) {
        const tripPath = path.join(TRIP_DIR, tripDir);
        if (!fs.statSync(tripPath).isDirectory()) continue;

        const steps = fs.readdirSync(tripPath);
        for (const stepDir of steps) {
            const stepPath = path.join(tripPath, stepDir);
            if (!fs.statSync(stepPath).isDirectory()) continue;

            const match = stepDir.match(/_(\d+)$/);
            if (match) {
                const stepId = match[1];
                const photosDir = path.join(stepPath, 'photos');
                const videosDir = path.join(stepPath, 'videos');

                const photoFiles = await getFiles(photosDir);
                const videoFiles = await getFiles(videosDir);

                const photos = [];
                for (const file of photoFiles) {
                    const originalPath = path.join(photosDir, file);
                    const thumbPath = await ensureThumbnail(originalPath);
                    
                    photos.push({
                        original: `trip/${tripDir}/${stepDir}/photos/${file}`,
                        thumb: thumbPath ? `trip/${tripDir}/${stepDir}/photos/${path.basename(thumbPath)}` : `trip/${tripDir}/${stepDir}/photos/${file}`
                    });
                }

                manifest[stepId] = {
                    photos,
                    videos: videoFiles.map(f => `trip/${tripDir}/${stepDir}/videos/${f}`)
                };
            }
        }
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
    console.log(`Manifest generated at ${OUTPUT_FILE}`);
}

run().catch(console.error);
