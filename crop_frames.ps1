Add-Type -AssemblyName System.Drawing

$inputPath = (Get-Item "public\mascot_loading_banner.jpg").FullName
$img = [System.Drawing.Bitmap]::FromFile($inputPath)
$w = $img.Width
$h = $img.Height
Write-Host "Total Size: $w x $h"

# Create frames directory
$outDir = (Get-Item "public").FullName + "\frames"
if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir
}

# The image has:
# Row 1: 3 columns (frame 1: 20%, frame 2: 40%, frame 3: 60%)
# Row 2: 3 columns (frame 4: 80%, frame 5: 95%, frame 6: 100%)
# Row 3: 1 wide column (frame 7: 100% wide)
# Let's calculate heights:
# Top 2 rows each take roughly 33% of height, bottom wide row takes remaining ~34%

$r1Height = [int]($h * 0.328)
$r2Height = [int]($h * 0.328)
$r3Y = [int]($h * 0.656)
$r3Height = $h - $r3Y

$colWidth = [int]($w / 3)

# Function to crop and save
function Crop-Image($x, $y, $width, $height, $outName) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $width, $height)
    $cropped = $img.Clone($rect, $img.PixelFormat)
    $cropped.Save("$outDir\$outName", [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $cropped.Dispose()
    Write-Host "Saved $outName : ($x, $y, $width, $height)"
}

# Row 1
Crop-Image 0 0 $colWidth $r1Height "frame_20.jpg"
Crop-Image $colWidth 0 $colWidth $r1Height "frame_40.jpg"
Crop-Image ($colWidth * 2) 0 ($w - ($colWidth * 2)) $r1Height "frame_60.jpg"

# Row 2
$r2Y = $r1Height
Crop-Image 0 $r2Y $colWidth $r2Height "frame_80.jpg"
Crop-Image $colWidth $r2Y $colWidth $r2Height "frame_95.jpg"
Crop-Image ($colWidth * 2) $r2Y ($w - ($colWidth * 2)) $r2Height "frame_100_a.jpg"

# Row 3 (Wide final celebratory 100%)
Crop-Image 0 $r3Y $w $r3Height "frame_100_final.jpg"

$img.Dispose()
Write-Host "All frames successfully cropped!"
