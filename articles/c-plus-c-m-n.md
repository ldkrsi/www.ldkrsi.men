```yaml
tags:
  - c++
```

# [C++] 列出所有組合 C m 取 n (Combination)

C m 取 n 

C(m,n)

## 迴圈寫法

```c++
#include<iostream>
#include<vector>
using namespace std;

void comb(int n, int m);

int main() {
    int m, n;
    cin >> m >> n;
    comb(n, m);
    system("pause");
    return 0;
}

void comb(int n, int m) {
    vector < int > list;
    for (int i = 0; i < n; ++i) {
        list.push_back(i);
    }
    --list[n - 1];
    do {
        for (int i = n - 1; i >= 0; --i) {
            if (list[i] < m + i - n) {
                ++list[i];
                for (int j = i + 1; j < n; ++j) {
                    list[j] = list[i] + j - i;
                }
                break;
            }
        }
        for (int i = 0; i < n; ++i) {
            cout << list[i] + 1 << '\t';
        }
        cout << endl;
    } while (list[0] < (m - n));
}
```

## 遞迴寫法

```c++
#include<iostream>
#include<vector>
using namespace std;

void c_recur(int k, int n, int m, vector < int > list);

int main() {
    int m, n;
    cin >> m >> n;
    vector < int > list;
    for (int i = 0; i <= (m - n) && n > 0; ++i) {
        c_recur(i + 1, n - 1, m, list);
    }
    system("pause");
    return 0;
}

void c_recur(int k, int n, int m, vector < int > list) {
    list.push_back(k - 1);
    for (int i = k; i <= (m - n) && n > 0; ++i) {
        c_recur(i + 1, n - 1, m, list);
    }
    if (n == 0) {
        for (int i = 0; i < list.size(); ++i) {
            cout << list[i] << '\t';
        }
        cout << endl;
    }
}
```