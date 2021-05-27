```yaml
tags:
  - python
```

# Python - csv 檔案和 Dictionary 互相轉換

用 Python 內建的 `csv.DictReader` 和 `csv.DictWriter` 就能用簡單幾行完成帶有 header 的 csv 檔讀寫。

## 讀取 csv 檔至 Dictionary

```python
import csv

for row in csv.DictReader(open('tmp.csv', 'r')):
    print(row)
```

## 把 Dictionary 寫入 csv 檔案

```python
import csv

my_dicts = [{"test": 1, "testing": 2}, {"test": 3, "testing": 4}]

w = csv.DictWriter(open("tmp.csv", "w"), my_dicts[0].keys())
w.writeheader()
w.writerows(my_dicts)
```