# 3단계: 고급 통계학 📕

## 목차
1. [다변량 통계분석](#1-다변량-통계분석)
2. [시계열 분석](#2-시계열-분석)
3. [베이지안 통계](#3-베이지안-통계)
4. [기계학습을 위한 통계적 기법](#4-기계학습을-위한-통계적-기법)

---

## 1. 다변량 통계분석 (Multivariate Analysis)

### 1.1 주성분 분석 (PCA - Principal Component Analysis)

#### 목적
```
고차원 데이터를 저차원으로 축소
- 변수 간 상관관계 활용
- 정보 손실 최소화
- 차원의 저주 해결
```

#### 수학적 원리
```
공분산 행렬의 고유값 분해

Σ = PΛP'

P: 고유벡터 (주성분 방향)
Λ: 고유값 (분산)
```

**주성분 점수**:
```
PC₁ = a₁₁X₁ + a₁₂X₂ + ... + a₁ₚXₚ
PC₂ = a₂₁X₁ + a₂₂X₂ + ... + a₂ₚXₚ

조건:
1. Var(PC₁) ≥ Var(PC₂) ≥ ...
2. Cov(PCᵢ, PCⱼ) = 0 (직교)
3. Σa²ᵢⱼ = 1 (정규화)
```

#### 절차
```
1. 데이터 표준화 (중요!)
   Z = (X - μ) / σ

2. 공분산(또는 상관) 행렬 계산

3. 고유값, 고유벡터 계산

4. 주성분 개수 선택
   - 누적 기여율 85-95%
   - Scree plot
   - Kaiser 기준 (λ > 1)

5. 주성분 점수 계산

6. 해석 및 활용
```

**예제**: 고객 세분화
```
변수: 구매빈도, 구매금액, 방문횟수, 체류시간

PC1: "활동성" (모든 변수 양의 부하)
PC2: "구매패턴" (빈도 vs 금액 대비)

차원축소: 4차원 → 2차원
시각화 및 클러스터링 용이
```

#### 주성분 해석
```
부하량 (Loading):
- 주성분과 원변수 간 상관
- 절댓값이 클수록 중요

기여율:
- 각 주성분이 설명하는 분산 비율
- λᵢ / Σλ × 100%
```

**실무 활용**:
- 차원 축소 (시각화)
- 다중공선성 해결
- 노이즈 제거
- 데이터 압축
- 특징 추출 (Feature Engineering)

#### PCA 주의사항
```
1. 표준화 필수 (척도 다를 때)
2. 이상치에 민감
3. 선형 관계만 포착
4. 해석이 어려울 수 있음
5. 정보 손실 발생
```

**대안**:
- Kernel PCA (비선형)
- Sparse PCA (해석 용이)
- ICA (Independent Component Analysis)

### 1.2 요인분석 (Factor Analysis)

#### PCA vs 요인분석
```
PCA: 차원 축소, 관측변수 → 주성분
요인분석: 잠재요인 발견, 잠재요인 → 관측변수

X = ΛF + ε

X: 관측변수
F: 공통요인
Λ: 요인부하량
ε: 고유요인
```

#### 모형
```
공통성 (Communality): h² = Λ²
고유성 (Uniqueness): 1 - h²
```

#### 추정 방법
```
1. 주성분법 (Principal Component)
2. 최대우도법 (Maximum Likelihood)
3. 주축법 (Principal Axis)
```

#### 요인 회전 (Rotation)
```
목적: 해석 용이성 증대

직교 회전:
- Varimax: 가장 일반적
- Quartimax
- Equamax

사교 회전:
- Oblimin
- Promax
```

**예제**: 성격 측정
```
30개 문항 → 5개 요인
(Big Five: 외향성, 성실성, 개방성, 친화성, 신경성)

요인 1: 외향성 (사교적, 활동적, 말이 많은)
요인 2: 성실성 (계획적, 조직적, 신중한)
...
```

#### 요인 개수 결정
```
1. 고유값 > 1 (Kaiser 기준)
2. Scree plot
3. 누적 기여율 (60% 이상)
4. 병렬분석 (Parallel Analysis)
5. 이론적 배경
```

#### 적합도 검정
```
χ² 검정 (최대우도법)
KMO (Kaiser-Meyer-Olkin) 측도
- > 0.9: 매우 좋음
- > 0.8: 좋음
- > 0.7: 적당
- > 0.6: 보통
- < 0.5: 부적합

Bartlett 구형성 검정
- 유의하면 요인분석 적합
```

**실무 활용**:
- 설문지 개발
- 척도 타당도 검증
- 고객 세분화
- 브랜드 포지셔닝

### 1.3 판별분석 (Discriminant Analysis)

#### 목적
```
그룹을 구분하는 판별함수 생성
새로운 관측치의 그룹 분류
```

#### 선형판별함수 (LDA)
```
D = b₀ + b₁X₁ + b₂X₂ + ... + bₚXₚ

D: 판별점수
분류 기준: D와 임계값 비교
```

#### 가정
```
1. 다변량 정규분포
2. 등분산-공분산 행렬
3. 선형 관계
```

#### 절차
```
1. 그룹 간 차이 검정 (MANOVA)
2. 판별함수 도출
3. 판별력 평가
   - Wilks' Lambda (작을수록 좋음)
   - 정준상관 (클수록 좋음)
4. 분류 정확도 평가
   - 혼동행렬
   - Hit ratio
5. 교차타당도 (Cross-validation)
```

**예제**: 신용 위험 평가
```
변수: 소득, 부채비율, 신용점수, 연령
그룹: 우량, 불량

판별함수:
D = -2.1 + 0.5×소득 - 1.2×부채비율 + 0.8×신용점수

D > 0 → 우량
D ≤ 0 → 불량
```

#### 다집단 판별분석
```
k개 그룹 → k-1개 판별함수

정준판별분석 (Canonical Discriminant Analysis)
```

**실무 활용**:
- 신용평가
- 고객 이탈 예측
- 질병 진단
- 시장 세분화

#### 판별분석 vs 로지스틱 회귀
```
판별분석:
+ 다집단 분류 용이
+ 해석 직관적
- 가정 엄격

로지스틱 회귀:
+ 가정 완화
+ 확률 직접 추정
- 이진 분류 위주
```

### 1.4 군집분석 (Cluster Analysis)

#### 목적
```
유사한 개체를 그룹화
데이터 구조 탐색
세분화 (Segmentation)
```

#### 계층적 군집분석 (Hierarchical Clustering)

**병합법 (Agglomerative)**:
```
1. 각 개체를 하나의 군집으로 시작
2. 가장 가까운 두 군집 병합
3. 반복
4. 덴드로그램으로 표현
```

**거리 측정**:
```
유클리드 거리:
d(x,y) = √Σ(xᵢ - yᵢ)²

맨해튼 거리:
d(x,y) = Σ|xᵢ - yᵢ|

체비셰프 거리:
d(x,y) = max|xᵢ - yᵢ|

마할라노비스 거리:
(척도 및 상관 고려)
```

**연결법 (Linkage)**:
```
단일 연결 (Single): 최소 거리
완전 연결 (Complete): 최대 거리
평균 연결 (Average): 평균 거리
Ward: 군집 내 분산 최소화 (추천)
```

#### 비계층적 군집분석

**K-means**:
```
1. k개 중심점 무작위 선택
2. 각 점을 가장 가까운 중심에 할당
3. 중심점 재계산
4. 수렴까지 반복
```

**장점**:
- 빠름
- 대용량 데이터 가능
- 간단함

**단점**:
- k를 미리 지정
- 초기값에 민감
- 구형 군집 가정

**k 결정 방법**:
```
1. Elbow method
   - WSS (Within-cluster Sum of Squares) 플롯

2. Silhouette score
   - 군집 응집도와 분리도
   - -1 ~ 1, 높을수록 좋음

3. Gap statistic

4. 도메인 지식
```

**예제**: 고객 세분화
```
변수: RFM (Recency, Frequency, Monetary)

군집 1: VIP (최근 구매, 빈도↑, 금액↑)
군집 2: 잠재 이탈 (오래 전 구매, 빈도↓)
군집 3: 신규 고객 (최근 유입, 적은 구매)
군집 4: 충성 고객 (꾸준한 구매)
```

**다른 알고리즘**:
```
DBSCAN: 밀도 기반, 임의 모양 가능
Hierarchical DBSCAN (HDBSCAN)
Gaussian Mixture Model (GMM)
Spectral Clustering
```

**실무 활용**:
- 고객 세분화
- 시장 세분화
- 이미지 분할
- 이상치 탐지
- 문서 분류

#### 군집 검증
```
1. 내적 검증
   - Silhouette coefficient
   - Davies-Bouldin index
   - Calinski-Harabasz index

2. 외적 검증 (정답 있을 때)
   - Adjusted Rand Index
   - Normalized Mutual Information

3. 안정성
   - Bootstrap
   - 교차검증
```

### 1.5 다차원척도법 (MDS - Multidimensional Scaling)

#### 목적
```
개체 간 (비)유사성을 저차원 공간에 표현
거리 보존
```

**입력**: 거리(비유사성) 행렬
**출력**: 좌표 (보통 2D, 3D)

#### 고전적 MDS (Classical MDS)
```
= 주좌표분석 (Principal Coordinates Analysis)
거리 행렬 → 좌표

PCA와 유사하나 입력이 다름
```

#### 비계량 MDS (Non-metric MDS)
```
순서만 보존
Kruskal's stress 최소화
```

**Stress**:
```
적합도 지표
0 ~ 1, 낮을수록 좋음

< 0.05: 매우 좋음
< 0.1: 좋음
< 0.2: 보통
> 0.2: 나쁨
```

**실무 활용**:
- 브랜드 포지셔닝 맵
- 소비자 선호 지도
- 텍스트 유사성 시각화

### 1.6 정준상관분석 (Canonical Correlation Analysis)

#### 목적
```
두 변수 집합 간 관계 분석

X변수군: X₁, X₂, ..., Xₚ
Y변수군: Y₁, Y₂, ..., Yᵧ

선형결합 간 상관 최대화
```

#### 정준변량
```
U = a₁X₁ + a₂X₂ + ... + aₚXₚ
V = b₁Y₁ + b₂Y₂ + ... + bᵧYᵧ

Cor(U, V) 최대화
```

**예제**: 학업성취와 학습태도
```
X변수: 수학, 과학, 영어 점수
Y변수: 학습시간, 자신감, 흥미

정준상관: X변수군과 Y변수군의 관계 강도
```

**실무 활용**:
- 마케팅 믹스 효과
- 조직문화-성과 관계
- 다변량 관계 탐색

### 1.7 구조방정식 모델링 (SEM - Structural Equation Modeling)

#### 개념
```
측정모형 + 구조모형

측정모형: 잠재변수 ← 관측변수
구조모형: 잠재변수 간 인과관계
```

#### 구성요소
```
잠재변수 (Latent Variable): 직접 관측 불가
관측변수 (Observed Variable): 측정 가능
경로 (Path): 인과관계
```

**예제**: 고객만족-재구매 모형
```
잠재변수: 제품품질, 서비스품질, 고객만족, 재구매의도

측정모형:
제품품질 → 내구성, 디자인, 기능
서비스품질 → 응대, 신속성, 전문성

구조모형:
제품품질 → 고객만족 → 재구매의도
서비스품질 → 고객만족 → 재구매의도
```

#### 적합도 지수
```
절대적합지수:
- χ²/df < 3
- RMSEA < 0.08
- GFI > 0.9

증분적합지수:
- CFI > 0.9
- TLI > 0.9
- NFI > 0.9

간명적합지수:
- PGFI
- PNFI
```

#### 추정 방법
```
ML (Maximum Likelihood): 가장 일반적
GLS (Generalized Least Squares)
WLS (Weighted Least Squares): 비정규
```

**실무 활용**:
- 고객만족-충성도 모형
- 조직효과성 연구
- 심리측정
- 마케팅 전략 수립

---

## 2. 시계열 분석 (Time Series Analysis)

### 2.1 시계열의 구성요소

#### 4가지 요소
```
추세 (Trend): 장기적 방향
계절성 (Seasonality): 주기적 패턴
순환 (Cycle): 비규칙적 장기 변동
불규칙 (Irregular): 랜덤 변동

분해:
Y_t = T_t + S_t + C_t + I_t (가법)
Y_t = T_t × S_t × C_t × I_t (승법)
```

#### 시계열 분해
```
Moving Average 분해
STL (Seasonal-Trend decomposition using Loess)
X-13ARIMA-SEATS
```

**예제**: 월별 매출
```
추세: 지속적 증가
계절성: 12월 피크 (연말 특수)
불규칙: 코로나, 프로모션 등
```

### 2.2 정상성 (Stationarity)

#### 정의
```
약정상성 (Weak Stationarity):
1. E(Y_t) = μ (일정한 평균)
2. Var(Y_t) = σ² (일정한 분산)
3. Cov(Y_t, Y_{t-k}) = γ_k (시간 무관)
```

**왜 중요?**:
- 대부분 모델은 정상성 가정
- 예측 가능성

#### 비정상 시계열
```
추세 있음 → 차분
분산 불안정 → 로그 변환
계절성 있음 → 계절 차분
```

#### 정상성 검정
```
ADF (Augmented Dickey-Fuller) Test:
H₀: 단위근 존재 (비정상)
H₁: 정상

p < 0.05 → 정상

KPSS Test:
H₀: 정상
H₁: 비정상
```

#### 차분 (Differencing)
```
1차 차분: ∇Y_t = Y_t - Y_{t-1}
2차 차분: ∇²Y_t = ∇Y_t - ∇Y_{t-1}

계절 차분: ∇_sY_t = Y_t - Y_{t-s}
```

### 2.3 자기상관 (Autocorrelation)

#### ACF (Autocorrelation Function)
```
ρ_k = Cor(Y_t, Y_{t-k})

k: 시차 (Lag)
```

**해석**:
- 느리게 감소 → 비정상 (추세)
- 특정 시차 높음 → 계절성
- 빠르게 0 수렴 → 정상

#### PACF (Partial Autocorrelation Function)
```
다른 시차 영향 제거한 상관
```

**모형 식별**:
```
AR(p): PACF 절단, ACF 감소
MA(q): ACF 절단, PACF 감소
ARMA: 둘 다 감소
```

### 2.4 ARIMA 모델

#### AR (AutoRegressive) 모델
```
AR(p):
Y_t = c + φ₁Y_{t-1} + φ₂Y_{t-2} + ... + φₚY_{t-p} + ε_t

과거 값으로 예측
```

**예제**: AR(1)
```
Y_t = 5 + 0.8Y_{t-1} + ε_t

해석: 이전 값의 80% 영향
```

#### MA (Moving Average) 모델
```
MA(q):
Y_t = μ + ε_t + θ₁ε_{t-1} + θ₂ε_{t-2} + ... + θᵧε_{t-q}

과거 오차로 예측
```

#### ARMA 모델
```
ARMA(p, q):
Y_t = c + φ₁Y_{t-1} + ... + φₚY_{t-p} + ε_t + θ₁ε_{t-1} + ... + θᵧε_{t-q}

AR + MA
```

#### ARIMA 모델
```
ARIMA(p, d, q):
p: AR 차수
d: 차분 차수
q: MA 차수

비정상 → 차분 d번 → ARMA(p,q)
```

#### 계절 ARIMA
```
SARIMA(p,d,q)(P,D,Q)_s:
비계절 부분: (p,d,q)
계절 부분: (P,D,Q)
s: 계절 주기
```

**예제**: 월별 항공 승객
```
SARIMA(1,1,1)(1,1,1)₁₂

1차 차분, 12차 계절 차분
AR(1), MA(1)
계절 AR(1), 계절 MA(1)
```

#### Box-Jenkins 방법론
```
1. 식별 (Identification)
   - 정상성 확인
   - ACF, PACF로 p, q 결정

2. 추정 (Estimation)
   - 최대우도법
   - 파라미터 추정

3. 진단 (Diagnostic)
   - 잔차 검정
   - Ljung-Box 검정 (백색잡음?)
   - 정규성

4. 예측 (Forecasting)
```

#### 모형 선택
```
AIC (Akaike Information Criterion):
AIC = -2log(L) + 2k
낮을수록 좋음

BIC (Bayesian Information Criterion):
BIC = -2log(L) + k×log(n)
더 보수적 (간명성 중시)

Auto ARIMA: 자동 선택
```

### 2.5 지수평활법 (Exponential Smoothing)

#### 단순 지수평활 (SES)
```
ŷ_{t+1} = αy_t + (1-α)ŷ_t

α: 평활상수 (0 < α < 1)
```

**특징**:
- 추세, 계절성 없을 때
- 최근 값에 더 큰 가중치
- α 크면 → 민감, 작으면 → 평활

#### Holt 선형 지수평활
```
추세 있을 때

수준: l_t = αy_t + (1-α)(l_{t-1} + b_{t-1})
추세: b_t = β(l_t - l_{t-1}) + (1-β)b_{t-1}
예측: ŷ_{t+h} = l_t + hb_t
```

#### Holt-Winters 지수평활
```
계절성도 포함

가법 계절성:
s_t = γ(y_t - l_t) + (1-γ)s_{t-m}
ŷ_{t+h} = l_t + hb_t + s_{t+h-m}

승법 계절성:
ŷ_{t+h} = (l_t + hb_t)s_{t+h-m}
```

**실무 활용**:
- 수요 예측
- 재고 관리
- 판매 예측
- 빠르고 간단한 예측

### 2.6 벡터자기회귀 (VAR - Vector Autoregression)

#### 다변량 시계열
```
여러 시계열의 상호작용

Y_t = c + A₁Y_{t-1} + A₂Y_{t-2} + ... + Aₚ Y_{t-p} + ε_t

Y_t: n×1 벡터
A: n×n 행렬
```

**예제**: 금리-환율-주가
```
세 변수가 서로 영향
```

#### Granger 인과검정
```
X가 Y의 Granger 원인인가?

H₀: X의 과거값이 Y 예측에 도움 안 됨
```

#### 충격반응함수 (IRF)
```
한 변수 충격이 다른 변수에 미치는 동적 효과
```

#### 분산분해 (Variance Decomposition)
```
Y의 변동을 각 변수가 설명하는 비율
```

**실무 활용**:
- 거시경제 모형
- 금융시장 분석
- 정책 효과 분석

### 2.7 GARCH 모델

#### 변동성 모형
```
조건부 이분산성

GARCH(p, q):
σ²_t = ω + Σα_i ε²_{t-i} + Σβ_j σ²_{t-j}

변동성 군집 (Volatility Clustering)
```

**특징**:
- 큰 변동 후 큰 변동
- 작은 변동 후 작은 변동
- 금융 시계열에 흔함

**실무 활용**:
- VaR (Value at Risk) 계산
- 옵션 가격 결정
- 위험 관리
- 포트폴리오 최적화

---

## 3. 베이지안 통계 (Bayesian Statistics)

### 3.1 베이지안 vs 빈도주의

#### 빈도주의 (Frequentist)
```
확률: 장기적 빈도
모수: 고정된 미지의 값
추론: 표본에서 모수 추정
```

#### 베이지안 (Bayesian)
```
확률: 믿음의 정도
모수: 확률변수 (분포 있음)
추론: 사전분포 + 데이터 → 사후분포
```

### 3.2 베이즈 정리 (복습)

```
P(θ|D) = P(D|θ) × P(θ) / P(D)

θ: 모수
D: 데이터

P(θ): 사전분포 (Prior)
P(D|θ): 우도 (Likelihood)
P(θ|D): 사후분포 (Posterior)
P(D): 증거 (Evidence)
```

**비례식**:
```
Posterior ∝ Likelihood × Prior
```

### 3.3 사전분포 (Prior Distribution)

#### 유형

**무정보 사전분포 (Non-informative)**:
```
모든 값에 동등한 확률
균등분포, Jeffreys prior
```

**정보적 사전분포 (Informative)**:
```
사전 지식 반영
전문가 의견, 과거 연구
```

**공액 사전분포 (Conjugate)**:
```
사후분포가 사전분포와 같은 형태

예:
이항 우도 + 베타 사전 = 베타 사후
포아송 우도 + 감마 사전 = 감마 사후
정규 우도 + 정규 사전 = 정규 사후
```

#### 예제: 동전 던지기
```
사전: θ ~ Beta(α, β)
데이터: 10번 중 7번 앞면
우도: X|θ ~ Binomial(10, θ)

사후: θ|X ~ Beta(α+7, β+3)

무정보 사전 (α=1, β=1):
사후 = Beta(8, 4)
E(θ|X) = 8/(8+4) = 0.667
```

### 3.4 베이지안 추론

#### 점추정
```
사후평균: E(θ|D)
사후중앙값: Median(θ|D)
MAP (Maximum A Posteriori): mode(θ|D)
```

#### 구간추정
```
신뢰구간 (X)
신용구간 (Credible Interval, O)

95% 신용구간:
P(θ_L ≤ θ ≤ θ_U | D) = 0.95

해석: θ가 구간에 있을 확률 95%
```

**HPD (Highest Posterior Density)**:
```
가장 높은 밀도 영역
가장 짧은 구간
```

#### 예측분포
```
P(Y_{new}|D) = ∫ P(Y_{new}|θ) P(θ|D) dθ

모수 불확실성 반영
```

### 3.5 베이지안 가설검정

#### 베이즈 인자 (Bayes Factor)
```
BF = P(D|H₁) / P(D|H₀)

BF > 10: H₁ 강한 증거
BF > 3: H₁ 증거
BF ≈ 1: 차이 없음
BF < 1/3: H₀ 증거
```

**예제**: 신약 효과
```
H₀: 효과 없음 (θ = 0)
H₁: 효과 있음 (θ ≠ 0)

BF = 15 → 신약 효과 강한 증거
```

### 3.6 MCMC (Markov Chain Monte Carlo)

#### 왜 필요?
```
복잡한 사후분포 → 직접 계산 불가
수치적 근사 필요
```

#### Gibbs Sampling
```
1. 초기값 설정
2. 각 모수를 조건부 분포에서 샘플링
3. 반복
4. 수렴 후 샘플 = 사후분포
```

#### Metropolis-Hastings
```
1. 후보 생성
2. 수락 확률 계산
3. 수락 또는 기각
4. 반복
```

#### 수렴 진단
```
Trace plot: 시각적 확인
Gelman-Rubin statistic: R̂ < 1.1
Effective sample size (ESS)
Autocorrelation
```

**Burn-in**:
```
초기 샘플 버리기
수렴 전 샘플 제거
```

**Thinning**:
```
자기상관 감소
매 k번째 샘플만 사용
```

### 3.7 베이지안 회귀

#### 모형
```
Y = Xβ + ε
ε ~ N(0, σ²I)

사전분포:
β ~ N(β₀, Σ₀)
σ² ~ InvGamma(a, b)

사후분포:
P(β, σ²|Y, X) ∝ P(Y|X, β, σ²) P(β) P(σ²)
```

**장점**:
- 불확실성 정량화
- 정규화 (Regularization) 자연스럽게 포함
- 소표본에 강건

**베이지안 Lasso**:
```
β_i ~ Laplace(0, λ)

변수 선택 효과
```

### 3.8 계층적 베이지안 모형

#### 개념
```
모수에도 사전분포 → 하이퍼파라미터

예:
Y_ij ~ N(μ_i, σ²)
μ_i ~ N(μ, τ²)
μ ~ N(0, 100)
σ², τ² ~ InvGamma(...)
```

**특징**:
- 그룹 간 정보 공유
- Partial pooling
- 소그룹 추정 개선

**예제**: 학교별 성적
```
학교마다 평균 다름 (μ_i)
전체 평균 영향 받음 (μ)
극단값 완화 (Shrinkage)
```

**실무 활용**:
- 다층 모형
- 메타 분석
- A/B 테스트 (여러 변형)

---

## 4. 기계학습을 위한 통계적 기법

### 4.1 정규화 (Regularization)

#### Ridge 회귀 (L2)
```
min Σ(y - Xβ)² + λΣβ²_j

λ: 정규화 강도
큰 계수에 페널티
β가 0으로 수축 (Shrinkage)
```

**특징**:
- 다중공선성 해결
- 과적합 방지
- 모든 변수 유지

#### Lasso 회귀 (L1)
```
min Σ(y - Xβ)² + λΣ|β_j|

일부 β를 정확히 0으로
변수 선택 효과
```

**특징**:
- Sparse solution
- Feature selection
- 해석 용이

#### Elastic Net
```
min Σ(y - Xβ)² + λ₁Σ|β_j| + λ₂Σβ²_j

Ridge + Lasso
상관 변수 그룹 선택
```

**선택 가이드**:
```
변수 많고 중요 변수 적음 → Lasso
다중공선성 심함 → Ridge
상관 변수 그룹 → Elastic Net
```

### 4.2 교차검증 (Cross-Validation)

#### k-겹 교차검증
```
1. 데이터를 k개 분할
2. k-1개로 학습, 1개로 검증
3. k번 반복
4. 평균 성능
```

**일반적**: k=5 또는 10

#### Leave-One-Out (LOO)
```
k = n
소표본에 유용
계산 비용 큼
```

#### 시계열 교차검증
```
시간 순서 보존
Rolling/Expanding window
```

**목적**:
- 모델 성능 평가
- 하이퍼파라미터 튜닝
- 과적합 탐지

### 4.3 부트스트랩 (Bootstrap)

#### 개념
```
복원 추출로 B개 표본 생성
각 표본에서 통계량 계산
분포 추정
```

**용도**:
```
1. 신뢰구간
   - 백분위수 방법
   - BCa (Bias-Corrected and Accelerated)

2. 표준오차

3. 가설검정

4. 모델 검증
```

**예제**: 중앙값 신뢰구간
```
1. 1000번 부트스트랩
2. 각 중앙값 계산
3. 2.5%, 97.5% 백분위수 → 95% CI
```

**Bagging (Bootstrap Aggregating)**:
```
여러 부트스트랩 모델 평균
분산 감소
Random Forest의 기반
```

### 4.4 앙상블 방법 (Ensemble Methods)

#### Bagging
```
Bootstrap + Aggregating
여러 모델 독립적 학습
평균 (회귀) 또는 투표 (분류)

예: Random Forest
```

**효과**:
- 분산 감소
- 과적합 방지
- 안정성 증가

#### Boosting
```
순차적 학습
이전 모델 오차에 집중
가중 결합

예: AdaBoost, Gradient Boosting, XGBoost
```

**효과**:
- 편향 감소
- 정확도 향상
- 과적합 주의

#### Stacking
```
여러 모델 학습
메타 모델로 결합
```

**비교**:
```
Bagging: 분산↓, 병렬
Boosting: 편향↓, 순차
Stacking: 유연, 복잡
```

### 4.5 차원 축소와 특징 선택

#### 특징 선택 (Feature Selection)
```
Filter:
- 상관계수
- 카이제곱 검정
- 정보 이득
- 빠름, 모델 무관

Wrapper:
- Forward/Backward selection
- RFE (Recursive Feature Elimination)
- 느림, 모델 특화

Embedded:
- Lasso
- Tree-based feature importance
- 학습 중 선택
```

#### 특징 추출 (Feature Extraction)
```
PCA, LDA, t-SNE, UMAP
원 변수 → 새 변수
정보 압축
```

**차이**:
```
Selection: 원 변수 중 선택
Extraction: 새 변수 생성
```

### 4.6 불균형 데이터 (Imbalanced Data)

#### 문제
```
한 클래스가 극소수
예: 사기 탐지 (0.1% 사기)

Accuracy 함정:
모두 정상 예측 → 99.9% 정확도
하지만 쓸모없음!
```

#### 평가지표
```
Precision = TP / (TP + FP)
Recall = TP / (TP + FN)
F1-score = 2 × (Precision × Recall) / (Precision + Recall)

AUC-ROC: 클래스 분리 능력
AUC-PR: 불균형 데이터에 적합
```

#### 해결 방법

**재샘플링**:
```
Over-sampling:
- SMOTE (Synthetic Minority Over-sampling)
- ADASYN

Under-sampling:
- Random under-sampling
- Tomek links

Combined:
- SMOTETomek
```

**알고리즘**:
```
Class weight:
- 소수 클래스에 높은 가중치

Anomaly detection:
- One-class SVM
- Isolation Forest

Cost-sensitive learning
```

**앙상블**:
```
Balanced Random Forest
EasyEnsemble
BalanceCascade
```

### 4.7 인과추론 (Causal Inference)

#### 상관 vs 인과
```
상관: X와 Y가 함께 움직임
인과: X가 Y를 일으킴

아이스크림 판매 ↔ 익사 사고
(여름이라는 교란변수)
```

#### 잠재적 결과 프레임워크
```
Y_i(1): 처치 받았을 때 결과
Y_i(0): 처치 안 받았을 때 결과

개인 인과효과: Y_i(1) - Y_i(0)
문제: 둘 다 관측 불가!

평균 처치효과 (ATE):
E[Y(1) - Y(0)]
```

#### 무작위 실험 (RCT)
```
가장 강력한 인과추론
처치 무작위 배정
교란변수 균형
```

#### 관찰 연구 방법

**매칭 (Matching)**:
```
처치군과 대조군 유사하게 매칭
Propensity Score Matching
Covariate Matching
```

**성향점수 (Propensity Score)**:
```
P(T=1|X): 처치 받을 확률
차원 축소 효과
균형 검증 필요
```

**도구변수 (Instrumental Variable)**:
```
Z → X → Y
Z는 X에만 영향
내생성 문제 해결
```

**이중차분법 (Difference-in-Differences)**:
```
처치 전후, 처치/대조군 비교
시간 불변 교란변수 제거
평행 추세 가정
```

**회귀불연속 (Regression Discontinuity)**:
```
기준점 근처 비교
국소적 무작위화
```

**실무 활용**:
- A/B 테스트
- 정책 평가
- 마케팅 효과 측정
- 의학 연구

### 4.8 실험 설계 (Experimental Design)

#### A/B 테스트
```
두 버전 무작위 배정
전환율, 매출 등 비교
```

**표본 크기**:
```
n = 2(Z_α/2 + Z_β)² × p̄(1-p̄) / (p₁-p₀)²

검정력 (Power) = 1 - β
보통 80% 이상
```

**주의사항**:
```
1. 다중비교 문제
   - Bonferroni 보정

2. 조기 종료 위험
   - Sequential testing

3. 네트워크 효과
   - Switchback test

4. 계절성
   - 충분한 기간
```

#### 다변량 테스트 (MVT)
```
여러 요소 동시 테스트
교호작용 파악
표본 크기 많이 필요
```

#### 밴딧 알고리즘 (Multi-Armed Bandit)
```
탐색 vs 활용
동적 배분
Regret 최소화

알고리즘:
- ε-greedy
- UCB (Upper Confidence Bound)
- Thompson Sampling (베이지안)
```

**A/B vs Bandit**:
```
A/B: 명확한 결론, 고정 배분
Bandit: 빠른 최적화, 동적 배분
```

### 4.9 생존분석 (Survival Analysis)

#### 개념
```
사건 발생까지 시간 분석
중도절단 (Censoring) 고려
```

**생존함수**:
```
S(t) = P(T > t)
```

**위험함수**:
```
h(t) = lim P(t ≤ T < t+Δt | T ≥ t) / Δt
```

#### Kaplan-Meier 추정
```
비모수적
생존 곡선 추정
중도절단 처리
```

**Log-rank 검정**:
```
두 그룹 생존 곡선 비교
```

#### Cox 비례위험 모델
```
h(t|X) = h₀(t) × exp(β₁X₁ + ... + βₚXₚ)

h₀(t): 기저위험
exp(β): 위험비 (Hazard Ratio)
```

**해석**:
```
HR = 2: 위험이 2배
HR = 0.5: 위험이 절반
```

**실무 활용**:
- 고객 이탈 (Churn)
- 기계 고장
- 재구매까지 시간
- 의학 생존율

---

## 실습 프로젝트

### 프로젝트 1: 고객 세분화
```
데이터: RFM
방법: PCA + K-means
목표: 마케팅 전략 수립
```

### 프로젝트 2: 매출 예측
```
데이터: 월별 매출 (시계열)
방법: SARIMA, 지수평활
목표: 향후 6개월 예측
```

### 프로젝트 3: A/B 테스트
```
데이터: 웹사이트 전환율
방법: 베이지안 A/B 테스트
목표: 새 디자인 효과 평가
```

### 프로젝트 4: 추천 시스템
```
데이터: 사용자-아이템 행렬
방법: 협업 필터링, SVD
목표: 개인화 추천
```

### 프로젝트 5: 이탈 예측
```
데이터: 고객 행동 데이터
방법: 로지스틱 회귀, Random Forest, 생존분석
목표: 이탈 위험 고객 식별
```

---

## 최신 트렌드

### AutoML
```
자동 모델 선택
하이퍼파라미터 튜닝
Feature engineering

도구: Auto-sklearn, TPOT, H2O
```

### 인과 기계학습
```
Uplift modeling
Causal forest
Double machine learning
```

### 베이지안 최적화
```
하이퍼파라미터 튜닝
비용 함수 최적화
효율적 탐색
```

### 설명 가능한 AI (XAI)
```
SHAP (SHapley Additive exPlanations)
LIME (Local Interpretable Model-agnostic Explanations)
Partial Dependence Plots
```

---

## 학습 완료!

축하합니다! 기초부터 고급까지 통계학을 완주했습니다.

**다음 학습 경로**:
1. **실무 프로젝트**: 실제 데이터로 적용
2. **기계학습**: Scikit-learn, TensorFlow, PyTorch
3. **딥러닝**: Neural Networks, CNN, RNN
4. **특화 분야**: NLP, Computer Vision, Reinforcement Learning

**계속 공부할 주제**:
- 공간통계 (Spatial Statistics)
- 함수형 데이터 분석 (Functional Data Analysis)
- 극값 이론 (Extreme Value Theory)
- 네트워크 분석 (Network Analysis)
- 토픽 모델링 (Topic Modeling)

---

## 참고 자료

### 도서
- "The Elements of Statistical Learning" - Hastie, Tibshirani, Friedman
- "Bayesian Data Analysis" - Gelman et al.
- "Time Series Analysis and Its Applications" - Shumway, Stoffer
- "Causal Inference" - Hernán, Robins

### Python 라이브러리
```python
# 다변량 분석
from sklearn.decomposition import PCA, FactorAnalysis
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.cluster import KMeans, DBSCAN, AgglomerativeClustering

# 시계열
import statsmodels.api as sm
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.statespace.sarimax import SARIMAX
from prophet import Prophet

# 베이지안
import pymc as pm
import arviz as az

# 인과추론
from econml import DML
from dowhy import CausalModel

# 생존분석
from lifelines import KaplanMeierFitter, CoxPHFitter
```

### R 패키지
```r
# 다변량
library(psych)
library(FactoMineR)
library(cluster)

# 시계열
library(forecast)
library(tseries)
library(vars)

# 베이지안
library(rstan)
library(brms)
library(rstanarm)

# 인과추론
library(MatchIt)
library(CausalImpact)

# 생존분석
library(survival)
library(survminer)
```

---

**최종 체크리스트**:
- [ ] 다변량 분석 기법 이해 및 적용
- [ ] 시계열 모델링 및 예측
- [ ] 베이지안 추론 수행
- [ ] 정규화 기법 활용
- [ ] 교차검증으로 모델 평가
- [ ] 인과추론 개념 이해
- [ ] 실무 프로젝트 완료

**당신은 이제 통계학 전문가입니다!** 🎉
