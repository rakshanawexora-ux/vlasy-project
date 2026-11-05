# VLASY studio editorial images

`studio-v2/` contains 47 native-resolution AI editorial assets: 44 newly generated
salon/studio images, one new mobile portrait companion, and two existing matched
hair-replacement illustrations re-exported from their original PNG sources.

The creative direction uses clean backgrounds, stronger hair contrast, neutral
lighting and realistic skin and hair detail. These are fictional subjects and
editorial concepts, not actual VLASY clients, staff, premises or documented results.
Keep all visible disclosures. Related sub-services can share a relevant image.
The supplied logo is separate and unchanged.

## Quality

Desktop images are 1536 × 1024; the dedicated mobile hero is 1024 × 1536. WebP
exports retain these native dimensions at quality 94. Next.js uses quality 90
for photographic images and caps responsive widths at 1536. No fake 4K enlargement
is applied. `docs/editorial-assets.json` records source checksums and dimensions.
The old enlarged campaign has been removed from the published image directory.

Phones use a portrait source through `<picture>`, avoiding extreme crops of a
wide shot. The hero displays a sharp still image by default. The native-sized
silent motion loop is an optional desktop enhancement, loaded only after Play.
Reduced motion and data saver continue to use a still image.

The comparison pair remains explicitly illustrative, with the same fictional
Indian man, pose and lighting before and after a simulated hair-system appearance.
Original generated PNGs remain in `/workspace/generated_images` on this instance;
archive them separately before retiring this temporary environment if needed.

See `docs/IMAGES.md` for straightforward replacement instructions.
