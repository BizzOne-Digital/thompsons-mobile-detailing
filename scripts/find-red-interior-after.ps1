Add-Type -AssemblyName System.Drawing
$src = Join-Path $PSScriptRoot "..\public\images\client\interior-frame-hunt"
$out = Join-Path $PSScriptRoot "..\red-interior-scan-frames.txt"
$results = @()
Get-ChildItem $src -Filter "*.jpg" | ForEach-Object {
  $path = $_.FullName
  try {
    $bmp = [System.Drawing.Bitmap]::new($path)
    $w = $bmp.Width; $h = $bmp.Height
    $step = [Math]::Max(8, [int]([Math]::Min($w, $h) / 40))
    $red = 0; $darkRed = 0; $n = 0
    for ($y = 0; $y -lt $h; $y += $step) {
      for ($x = 0; $x -lt $w; $x += $step) {
        $c = $bmp.GetPixel($x, $y)
        $r = $c.R; $g = $c.G; $b = $c.B
        $avg = ($r + $g + $b) / 3
        if ($r -gt 80 -and $r -gt ($g + 25) -and $r -gt ($b + 25)) { $red++ }
        if ($r -gt 60 -and $r -gt ($g + 15) -and $avg -lt 90) { $darkRed++ }
        $n++
      }
    }
    $bmp.Dispose()
    $redPct = 100 * $red / $n
    $darkPct = 100 * $darkRed / $n
    if ($redPct -ge 12) {
      $results += [pscustomobject]@{
        redPct   = [math]::Round($redPct, 1)
        darkPct  = [math]::Round($darkPct, 1)
        file     = $_.Name
      }
    }
  } catch {}
}
$results | Sort-Object darkPct, redPct -Descending |
  Select-Object -First 40 |
  Format-Table -AutoSize |
  Out-String -Width 300 |
  Set-Content -Path $out -Encoding utf8
