```yaml
tags:
  - python
```

# Python - 從生日計算年齡

```python
import datetime

def calculate_age(born):
    today = datetime.date.today()
    return today.year - born.year - ((today.month, today.day) < (born.month, born.day))


birth = datetime.date(1990, 1, 1)
age = calculate_age(birth)
print(age)
```

[資料來源](https://stackoverflow.com/questions/2217488/age-from-birthdate-in-python)