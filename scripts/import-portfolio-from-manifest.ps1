<#
.SYNOPSIS
  Copies portfolio images from Cursor assets into public/images/portfolio using manifest JSON files.

.PARAMETER DryRun
  List actions without copying files.

.PARAMETER AssetsDir
  Folder containing *image-<uuid>.* source files.
#>
[CmdletBinding()]
param(
    [switch]$DryRun,
    [string]$AssetsDir = 'C:\Users\admin\.cursor\projects\e-2sri-nokri-Vernon-Thompson\assets'
)

$ErrorActionPreference = 'Stop'
$scriptDir = $PSScriptRoot
$repoRoot = Split-Path $scriptDir -Parent
$destRoot = Join-Path $repoRoot 'public\images\portfolio'

$manifestFiles = @(
    (Join-Path $scriptDir 'portfolio-manifest-batch1.json'),
    (Join-Path $scriptDir 'portfolio-manifest-batch2.json')
)

function Find-AssetByUuid([string]$Uuid) {
    $pattern = Join-Path $AssetsDir "*$Uuid*"
    $matches = @(Get-ChildItem -Path $pattern -File -ErrorAction SilentlyContinue)
    if ($matches.Count -eq 0) {
        throw "No asset found for uuid $Uuid (pattern: $pattern)"
    }
    if ($matches.Count -gt 1) {
        $matches = $matches | Sort-Object LastWriteTime -Descending
    }
    return $matches[0].FullName
}

$all = @()
foreach ($mf in $manifestFiles) {
    if (-not (Test-Path -LiteralPath $mf)) {
        throw "Manifest not found: $mf"
    }
    $all += Get-Content -LiteralPath $mf -Raw | ConvertFrom-Json
}

$imported = 0
$skipped = 0
$slugSet = [System.Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)
$errors = @()

foreach ($row in $all) {
    if ($row.skip) {
        $skipped++
        continue
    }

    try {
        $src = Find-AssetByUuid $row.uuid
        $slugDir = Join-Path $destRoot $row.slug
        $dest = Join-Path $slugDir $row.destFile

        if (-not $DryRun) {
            if (-not (Test-Path -LiteralPath $slugDir)) {
                New-Item -ItemType Directory -Path $slugDir -Force | Out-Null
            }
            Copy-Item -LiteralPath $src -Destination $dest -Force
        }

        $slugSet.Add($row.slug) | Out-Null
        $imported++
    }
    catch {
        $errors += $_.Exception.Message
    }
}

Write-Host "Imported: $imported"
Write-Host "Skipped:  $skipped"
Write-Host "Slugs ($($slugSet.Count)):"
$slugSet | Sort-Object | ForEach-Object { Write-Host "  $_" }

if ($errors.Count -gt 0) {
    Write-Warning "Errors ($($errors.Count)):"
    $errors | ForEach-Object { Write-Warning $_ }
    exit 1
}

if ($DryRun) {
    Write-Host '(Dry run — no files copied.)'
}
