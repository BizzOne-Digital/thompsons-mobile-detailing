$base = Join-Path $PSScriptRoot "..\public\videos\videos"
$out = Join-Path $PSScriptRoot "..\public\images\client\interior-frame-hunt"
New-Item -ItemType Directory -Force -Path $out | Out-Null
$manifest = Join-Path $PSScriptRoot "..\src\lib\client-videos-library.generated.ts"
$text = Get-Content $manifest -Raw
$matches = [regex]::Matches($text, '"/videos/videos/([^"]+)"\s*,\s*\r?\n\s*"label": "Interior and cabin transformation"')
$i = 0
foreach ($m in $matches) {
  $file = [uri]::UnescapeDataString($m.Groups[1].Value)
  $path = Join-Path $base $file
  if (-not (Test-Path $path)) { continue }
  $dur = [double](ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 $path 2>$null)
  foreach ($t in @(2,4,6,8,10,12,14,16,18,20,22,24,26,28,30)) {
    if ($t -gt $dur) { continue }
    $i++
    $dest = Join-Path $out ("int{0:D3}-t{1}.jpg" -f $i, $t)
    ffmpeg -y -ss $t -i $path -frames:v 1 -q:v 2 $dest 2>$null
  }
}
Write-Host "extracted=$i dir=$out"
