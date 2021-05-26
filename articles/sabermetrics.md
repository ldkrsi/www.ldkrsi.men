```yaml
tags:
  - 棒球統計
```

# 棒球統計名詞表

## 進攻數據

### 打擊統計數據

- PA：打席(Plate Appearances)
- AB：打數(At Bats)，算法為 PA -(四死球+SF+SH+妨礙打擊）
- H：安打(Hits)
- 1B：一壘安打(Single)
- 2B：二壘安打(Double)
- 3B：三壘安打(Triple)
- HR：全壘打(Home Runs)
- TB：壘打數(Total Bases)
- R：得分(Runs)
- RBI：打點(Run Batted In)
- BB：四壞保送(Base on Balls)，有時也稱Walks。在MLB裡這項統計包含IBB，但CPBL不含IBB
- IBB：故意四壞(Intentional Walks)
- HBP：觸身球(Hit By Pitch)
- SO：三振(Strike Out)，縮寫有時會用K
- SH：犧牲觸擊(Sacrifice Hits)，縮寫有時會用SAC
- SF：高飛犧牲打(Sacrifice Flies)
- GIDP：雙殺打(Ground Into Double Play)，也可以直接使用DP(Double Play)當縮寫
- GO：滾地球出局(Ground outs)
- FO：飛球出局(Fly Outs)，縮寫有時會用AO(Air Out)

### 打擊進階數據

- AVG：打擊率(Average)，公式為 安打數/打數，有時也會用BA(Batting Average)當縮寫
- OBP：上壘率(On base percentage)，公式為(H+BB+IBB+HBP) /(AB+BB+IBB+SF+HBP)
- SLG：長打率(Slugging Percentage)，公式為 壘打數/打數
- IsoP：純長打率(Isolated Power)，公式為 長打率 – 打擊率
- BABIP：場內球安打率(Batting Average on Balls put Into Play)，公式為(H-HR)/(AB-SO-HR+SF)
- OPS：攻擊指數(On-base Plus Slugging)，公式為 上壘率 + 長打率
- OPS+：(On-base Plus Slugging Plus)，公式為 (OBP/聯盟平均OBP + SLG/聯盟平均SLG – 1)*100
- AB/HR：平均多少打數會出現一支全壘打
- GO/FO：滾飛比
- BB/K：保送三振比，可以大概正比於選球能力

### 壘上數據

- SB：盜壘成功(Stolen Base)
- CS：盜壘失敗(Caught Stealing)
- Pick off：牽制出局
- SBA：盜壘嘗試(Stolen Base Attempt)，一般會直接用SB+CS表示，不使用這個縮寫
- SB%：盜壘成功率，SB/(SB+CS)*100%，中文簡稱”盜壘率”

## 防守數據

- IP：投球局數、守備局數(Innings Pitched)
- PO：刺殺(Putout)，抓到強迫進壘的跑者
- A：助殺(Assist)，在出局的傳球中非負責讓跑者出局，但有拿過球的人
- E：失誤(Error)，野手接觸到球後，因本身的過失靠成該出局的跑者未出局的情況
- TC：Total Chances，刺殺、助殺、失誤的總合，中文叫守備機會
- FPCT：守備率(Fielding Percentage)，(PO+A)/(PO+A+E)

### 投手統計數據

- BF：面對打者數(Batters Faced)
- NP：投球數(Number of Pitching)
- H：被安打(Hits)
- HR：被全壘打(Home Runs)
- BB：四壞保送(Base on Balls)。在MLB裡這項統計包含IBB，但CPBL不含IBB
- IBB：故意四壞(Intentional Walks)
- HBP：觸身球(Hit By Pitch)
- SO：三振(Strike Out)，縮寫有時會用K
- WP：暴投(Wild Pitches)
- BK：投手犯規(Balk)
- GO：滾地球出局(Ground outs)，在中職的投球統計中有包含成功犧牲觸擊所產生的出局數
- FO：飛球出局(Fly Outs)，縮寫有時會用AO(Air Out)
- R：失分
- ER：責失分
- GS：先發(Games Started)
- GR：後援(Games in Relief)
- W：勝投(Wins)
- L：敗投(Losses)
- CG：完投(Complete Games)
- SHO：完封(Shutouts)
- NBB：無四死球完封，似乎只有CPBL使用這個縮寫
- No-hitter：無安打比賽
- PG：完全比賽(Perfect Game)
- SV：救援成功(Saves)
- BS：救援失敗(Blown Saves)
- HLD：中繼成功(Hold)，有時也會簡寫成H

### 投手進階數據

- ERA：防禦率(Earned Run Average)，中文也可以稱作自責分率，或每九局責失。公式為 ER/IP*9
- WHIP：每局被上壘率(Walks plus Hits per Inning Pitched)，公式為 (BB+H)/IP
- H/9：每九局被安打，公式為 H/IP*9
- BB/9：每九局保送，公式為 BB/IP*9
- K/9：每九局三振數，公式為 SO/IP*9
- HR/9：每九局被全壘打，公式為 HR/IP*9
- K/BB：三振保送比
- BABIP：場內球安打率(Batting Average on Balls put Into Play)，公式為(H-HR)/(AB-SO-HR+SF)
- GO/FO：滾飛比
- NP/IP：平均單局用球數
- ERA+：公式為 (聯盟平均ERA/ERA)*100

### 捕手數據

- PB：捕逸(Passed Ball)，在球沒擦棒、觸身、落地的情況下，捕手沒接捕到合理接球範圍內的球
- SB：被盜壘成功(Stolen Base)
- CS：抓到盜壘者(Caught Stealing)
- CS%：阻殺率，公式為 CS/(SB+CS)*100%
