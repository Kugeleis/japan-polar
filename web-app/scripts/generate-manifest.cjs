const fs = require('fs');
const path = require('path');

const TRIP_DIR = path.join(__dirname, '../public/trip');
const OUTPUT_FILE = path.join(__dirname, '../public/media-manifest.json');

function getFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter(file => fs.statSync(path.join(dir, file)).isFile());
}

const manifest = {};

const trips = fs.readdirSync(TRIP_DIR);
trips.forEach(tripDir => {
    const tripPath = path.join(TRIP_DIR, tripDir);
    if (!fs.statSync(tripPath).isDirectory()) return;

    const steps = fs.readdirSync(tripPath);
    steps.forEach(stepDir => {
        const stepPath = path.join(tripPath, stepDir);
        if (!fs.statSync(stepPath).isDirectory()) return;

        // Step directories are named like fukuoka-shi_224605677
        const match = stepDir.match(/_(\d+)$/);
        if (match) {
            const stepId = match[1];
            const photosDir = path.join(stepPath, 'photos');
            const videosDir = path.join(stepPath, 'videos');

            manifest[stepId] = {
                photos: getFiles(photosDir).map(f => `/trip/${tripDir}/${stepDir}/photos/${f}`),
                videos: getFiles(videosDir).map(f => `/trip/${tripDir}/${stepDir}/videos/${f}`)
            };
        }
    });
});

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
console.log(`Manifest generated at ${OUTPUT_FILE}`);
