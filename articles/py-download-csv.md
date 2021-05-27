```yaml
tags:
  - python
```

# Python - urlopen 結合 csv reader

從網路上爬 csv 資料下來後，直接套用 Python 內建 csv lib 的方法。

通過 `io.TextIOWrapper` 假裝 `urlopen` 的連線是個檔案就好。

```python
import io
import csv
import urllib.request

webpage = urllib.request.urlopen("https://example.com/test.csv")
for row in csv.reader(io.TextIOWrapper(webpage)):
    print(row)

```

[資料來源](https://stackoverflow.com/questions/21351882/reading-data-from-a-csv-file-online-in-python-3)