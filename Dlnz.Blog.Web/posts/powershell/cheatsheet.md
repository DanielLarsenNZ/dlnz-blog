# Dan's PowerShell cheatsheet

## Strings, Arrays

Create an Array

```PowerShell
$a = "one", "two", "three"

# in an argument list this syntax may be more convenient:
Set-FooBar -Items ("one", "two", "three")
```

Append an Array

```PowerShell
# Create an array
$a = "one", "two", "three"

# Append another array. Creates a new array (yay!)
$b = $a += "four", "five", "six"
```

Array Join

```PowerShell
# create an array of strings
$a = "one", "two", "three"
# join concatenated with a comma
$a -join ','
# output = one,two,three
```

`ArrayList` is a handy type for manipulating arrays:

```PowerShell
[System.Collections.ArrayList]$a = "one", "two", "three"
$a.AddRange(("four", "five", "six"))
```

> Watch out for `Get-ChildItem` - it will return a single File if one item found, or and Array of File if
> more than one item found. To force returning an array every time, surround with an array syntax: `@( )`

```PowerShell
[System.Collections.ArrayList]$files = @( Get-ChildItem C:\Temp -recurse -include '*.bak' )

```

### Links

* Adding/removing items from an Array: http://www.jonathanmedd.net/2014/01/adding-and-removing-items-from-a-powershell-array.html
* Get-ChildItem in PowerShell: http://www.kanasolution.com/2010/12/get-childitem-in-powershell/

## foreach

Some traps for young players here... `ForEach-Object` and `foreach()` are different.

Use `foreach()` like C# or JavaScript, e.g.

```PowerShell
foreach($file in $files) {
    Write-Verbose($file)
}
```

If you pipe to `foreach` it simply acts as an alias for `ForEach-Object`. With the non-pipeline version 
(`foreach()`) the `break` statement will exit the `foreach` loop. However if you break in the pipeline
version, it will exit the script(!). This can catch you out if you accidentally use the pipeline version
by using the `foreach` statement in a pipeline. Here are some examples to illustrate:

```PowerShell
# this will break to the next statement after the foreach loop:
$bakfile = $null
foreach($file in $files) {
    if ($file.Name.Contains('.bak')) {
        $bakfile
        break
    }
}

if ($bakfile -ne $null){
    Write-Host "Found $bakfile"
}

# this will exit the script
$files | ForEach-Object {
    Write-Verbose $file # THIS IS WRONG?
    break
}

# so will this!
$files | foreach {
    Write-Verbose $file # THIS IS WRONG?
    break
}
```

In PowerShell 4 there is a ForEach method on a Collection.

### Links

* break statement : http://ss64.com/ps/break.html
* ForEach method: http://ss64.com/ps/foreach-method.html


## map

`%` is shorthand for `foreach` so you can map quite elegantly like this:

```PowerShell
$filenames = $files | % { $_.FullName }
# $filenames is an Array of string
```

### Links

* Select / map PowerShell: http://stackoverflow.com/a/8909031

## JSON

Here is a cool way to generate JSON objects (thanks petern!). First create the object 
dynamically and then use the `ConvertTo-JSON` cmdlet:

```PowerShell
$customer = @{
    Id = 'abc123'
    Email = @{
            Address = 'alice@localtest.me'
            Verified = $true
    }
    PhoneNumbers = ('555-1234', '555-1235', '555-1236')
}

ConvertTo-Json $customer
```

Output:
```JavaScript
{
    "Email":  {
                  "Verified":  true,
                  "Address":  "alice@localtest.me"
              },
    "Id":  "abc123",
    "PhoneNumbers":  [
                         "555-1234",
                         "555-1235",
                         "555-1236"
                     ]
}
```

## `copy con`

```powershell
$content = @'
{
    "how": {
                "cool": "is PowerShell!"
            }
}
'@

Set-Content -Value $content -Encoding UTF8 -Path C:\ProgramData\Docker\abc123.json
```
