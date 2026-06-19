$basePath = 'd:\Sunil\Softwer\MERN Stack\Projects\HRMS\src'
$files = Get-ChildItem -Path $basePath -Recurse -Include '*.jsx','*.js' | Where-Object { $_.FullName -notmatch 'node_modules' -and $_.Length -gt 0 }

$replacements = @(
    @{Find='Profilee'; Replace='Profile'},
    @{Find='profilee'; Replace='profile'},
    @{Find='Performancence'; Replace='Performance'},
    @{Find='performancence'; Replace='performance'}
)

$count = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    if ($null -eq $content) { continue }
    $changed = $false
    foreach ($r in $replacements) {
        if ($content.Contains($r.Find)) {
            $content = $content.Replace($r.Find, $r.Replace)
            $changed = $true
        }
    }
    if ($changed) {
        Set-Content $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $count++
        Write-Host "Updated: $($file.Name)"
    }
}
Write-Host "`n$count files updated fixing typos"
