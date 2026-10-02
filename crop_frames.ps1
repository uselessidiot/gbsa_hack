Add-Type -AssemblyName System.Drawing

$inputPath = (Get-Item "public\mascot_loading_banner.jpg").FullName
$img = [System.Drawing.Bitmap]::FromFile($inputPath)
$w = $img.Width
$h = $img.Height
Write-Host "Total Source Size: $w x $h"

$outDir = (Get-Item "public").FullName + "\frames"
if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir
}

# Source image has 3 rows:
# Row 1 (y: 0 to ~188): 3 cols (20%, 40%, 60%)
# Row 2 (y: 189 to ~376): 3 cols (80%, 95%, 100%)
# Row 3 (y: 377 to ~574): wide celebratory 100%

$r1Height = [int]($h * 0.328)
$r2Height = [int]($h * 0.328)
$r3Y = [int]($h * 0.656)
$r3Height = $h - $r3Y
$colWidth = [int]($w / 3)

# JPEG Encoder with 100% Quality
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatID -eq [System.Drawing.Imaging.ImageFormat]::Jpeg.Guid }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]100)

function Crop-And-Upscale($x, $y, $sw, $sh, $outName, $targetW, $targetH) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $sw, $sh)
    $cropped = $img.Clone($rect, $img.PixelFormat)
    
    # Create high-res target bitmap
    $hiRes = New-Object System.Drawing.Bitmap($targetW, $targetH)
    $g = [System.Drawing.Graphics]::FromImage($hiRes)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $targetW, $targetH)
    $g.DrawImage($cropped, $destRect, 0, 0, $sw, $sh, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $cropped.Dispose()
    
    $outPath = "$outDir\$outName"
    $hiRes.Save($outPath, $encoder, $encoderParams)
    $hiRes.Dispose()
    Write-Host "Exported Ultra-HQ $outName : ($targetW x $targetH)"
}

# Upscale to crisp 800x440 resolution
$tw = 800
$th = 444

# Row 1
Crop-And-Upscale 0 0 $colWidth $r1Height "frame_20.jpg" $tw $th
Crop-And-Upscale $colWidth 0 $colWidth $r1Height "frame_40.jpg" $tw $th
Crop-And-Upscale ($colWidth * 2) 0 ($w - ($colWidth * 2)) $r1Height "frame_60.jpg" $tw $th

# Row 2
$r2Y = $r1Height
Crop-And-Upscale 0 $r2Y $colWidth $r2Height "frame_80.jpg" $tw $th
Crop-And-Upscale $colWidth $r2Y $colWidth $r2Height "frame_95.jpg" $tw $th
Crop-And-Upscale ($colWidth * 2) $r2Y ($w - ($colWidth * 2)) $r2Height "frame_100_a.jpg" $tw $th

# Row 3 (Wide celebratory 100%)
Crop-And-Upscale 0 $r3Y $w $r3Height "frame_100_final.jpg" 1024 444

$img.Dispose()
Write-Host "All frames regenerated in Ultra-High-Quality (100% quality, Bicubic interpolated)!"
