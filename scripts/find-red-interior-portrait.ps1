Add-Type -AssemblyName System.Drawing
$src = "C:\Users\admin\.cursor\projects\e-2sri-nokri-Vernon-Thompson\assets"
$out = Join-Path $PSScriptRoot "..\red-interior-portrait.txt"
$results = @()
Get-ChildItem $src -Filter "*.jpg" | ForEach-Object {
  $path = $_.FullName
  try {
    $bmp = [System.Drawing.Bitmap]::new($path)
    $w = $bmp.Width; $h = $bmp.Height
    if ($w -ge $h) { $bmp.Dispose(); return }
    $step = [Math]::Max(8, [int]([Math]::Min($w, $h) / 40))
    $red = 0; $dark = 0; $n = 0
    for ($y = 0; $y -lt $h; $y += $step) {
      for ($x = 0; $x -lt $w; $x += $step) {
        $c = $bmp.GetPixel($x, $y)
        $r = $c.R; $g = $c.G; $b = $c.B
        $avg = ($r + $g + $b) / 3
        if ($r -gt 80 -and $r -gt ($g + 25) -and $r -gt ($b + 25)) { $red++ }
        if ($r -gt 60 -and $r -gt ($g + 15) -and $avg -lt 90) { $dark++ }
        $n++
      }
    }
    $bmp.Dispose()
    $redPct = 100 * $red / $n
    $darkPct = 100 * $dark / $n
    if ($redPct -ge 28 -and $darkPct -le 18) {
      $results += [pscustomobject]@{ redPct = [math]::Round($redPct, 1); darkPct = [math]::Round($darkPct, 1); file = $_.Name }
    }
  } catch {}
}
$results | Sort-Object darkPct, redPct -Descending |
  Format-Table -AutoSize |
  Out-String -Width 320 |
  Set-Content -Path $out -Encoding utf8
