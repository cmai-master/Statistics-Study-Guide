// 전역 변수
let studyStartTime = Date.now();
let charts = {};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    createNormalDistribution();
    createDistributionChart();
    createPCAVisualization();
    createTimeseriesChart();
    createCorrelationExample();
    loadProgress();
    updateProgress();
}

// 네비게이션 설정
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            navigateToSection(targetId);
        });
    });
}

function navigateToSection(sectionId) {
    // 모든 섹션 숨기기
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // 선택된 섹션 표시
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 네비게이션 활성화
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });

    // 진행도 바 업데이트
    updateProgressBar();
}

function updateProgressBar() {
    const sections = ['home', 'basic', 'intermediate', 'advanced', 'interactive', 'progress'];
    const currentSection = document.querySelector('.section.active');
    const currentId = currentSection ? currentSection.id : 'home';
    const progress = (sections.indexOf(currentId) / (sections.length - 1)) * 100;

    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
}

// 통계량 계산기
function calculateStats() {
    const input = document.getElementById('dataInput').value;
    const data = input.split(',').map(x => parseFloat(x.trim())).filter(x => !isNaN(x));

    if (data.length === 0) {
        showResult('statsResult', '<p class="error">유효한 데이터를 입력해주세요.</p>', true);
        return;
    }

    const sorted = [...data].sort((a, b) => a - b);
    const n = data.length;

    // 평균
    const mean = data.reduce((a, b) => a + b, 0) / n;

    // 중앙값
    let median;
    if (n % 2 === 0) {
        median = (sorted[n/2 - 1] + sorted[n/2]) / 2;
    } else {
        median = sorted[Math.floor(n/2)];
    }

    // 최빈값
    const frequency = {};
    data.forEach(x => frequency[x] = (frequency[x] || 0) + 1);
    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency).filter(x => frequency[x] === maxFreq);

    // 분산과 표준편차
    const variance = data.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);

    // 표본표준편차
    const sampleVar = data.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / (n - 1);
    const sampleStd = Math.sqrt(sampleVar);

    const result = `
        <h4>📊 통계 결과</h4>
        <p><strong>데이터 개수:</strong> ${n}</p>
        <p><strong>평균 (Mean):</strong> ${mean.toFixed(2)}</p>
        <p><strong>중앙값 (Median):</strong> ${median.toFixed(2)}</p>
        <p><strong>최빈값 (Mode):</strong> ${modes.join(', ')}</p>
        <p><strong>범위 (Range):</strong> ${(sorted[n-1] - sorted[0]).toFixed(2)}</p>
        <p><strong>분산 (Variance):</strong> ${variance.toFixed(2)}</p>
        <p><strong>표준편차 (SD):</strong> ${stdDev.toFixed(2)}</p>
        <p><strong>표본표준편차:</strong> ${sampleStd.toFixed(2)}</p>
        <p><strong>변동계수 (CV):</strong> ${((stdDev/mean) * 100).toFixed(2)}%</p>
    `;

    showResult('statsResult', result);
}

// 베이즈 정리 계산
function calculateBayes() {
    const pA = parseFloat(document.getElementById('priorA').value);
    const pBA = parseFloat(document.getElementById('likelihoodBA').value);
    const pBNotA = parseFloat(document.getElementById('likelihoodBNotA').value);

    // P(A')
    const pNotA = 1 - pA;

    // P(B) = P(B|A)P(A) + P(B|A')P(A')
    const pB = pBA * pA + pBNotA * pNotA;

    // P(A|B) = P(B|A)P(A) / P(B)
    const pAB = (pBA * pA) / pB;

    const result = `
        <h4>🎲 베이즈 정리 결과</h4>
        <p><strong>P(A):</strong> ${pA.toFixed(4)} (${(pA*100).toFixed(2)}%)</p>
        <p><strong>P(B|A):</strong> ${pBA.toFixed(4)}</p>
        <p><strong>P(B|A'):</strong> ${pBNotA.toFixed(4)}</p>
        <hr>
        <p><strong>P(B):</strong> ${pB.toFixed(4)}</p>
        <p><strong>P(A|B):</strong> ${pAB.toFixed(4)} (${(pAB*100).toFixed(2)}%)</p>
        <hr>
        <p>📌 해석: 검사 결과가 양성일 때, 실제로 사건 A가 발생했을 확률은 <strong>${(pAB*100).toFixed(2)}%</strong>입니다.</p>
    `;

    showResult('bayesResult', result);
}

// 정규분포 그래프
function createNormalDistribution() {
    const canvas = document.getElementById('normalDistChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // 정규분포 데이터 생성
    const data = [];
    const labels = [];
    for (let x = -4; x <= 4; x += 0.1) {
        labels.push(x.toFixed(1));
        const y = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
        data.push(y);
    }

    charts.normalDist = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'N(0, 1) - 표준정규분포',
                data: data,
                borderColor: 'rgb(52, 152, 219)',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '표준정규분포 (평균=0, 표준편차=1)'
                },
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '확률밀도'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'z-score'
                    }
                }
            }
        }
    });
}

// 분포 선택 차트
function createDistributionChart() {
    const canvas = document.getElementById('distributionChart');
    if (!canvas) return;

    updateDistribution();
}

function updateDistribution() {
    const select = document.getElementById('distSelect');
    if (!select) return;

    const distType = select.value;
    const canvas = document.getElementById('distributionChart');
    const ctx = canvas.getContext('2d');

    if (charts.distribution) {
        charts.distribution.destroy();
    }

    let data, labels, title;

    switch(distType) {
        case 'normal':
            ({ data, labels } = generateNormalDist(0, 1));
            title = '정규분포 N(0, 1)';
            break;
        case 'binomial':
            ({ data, labels } = generateBinomialDist(10, 0.5));
            title = '이항분포 B(10, 0.5)';
            break;
        case 'poisson':
            ({ data, labels } = generatePoissonDist(5));
            title = '포아송분포 λ=5';
            break;
        case 'exponential':
            ({ data, labels } = generateExponentialDist(1));
            title = '지수분포 λ=1';
            break;
    }

    charts.distribution = new Chart(ctx, {
        type: distType === 'binomial' || distType === 'poisson' ? 'bar' : 'line',
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                borderColor: 'rgb(39, 174, 96)',
                backgroundColor: 'rgba(39, 174, 96, 0.5)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            }
        }
    });
}

function generateNormalDist(mean, std) {
    const data = [];
    const labels = [];
    for (let x = mean - 4*std; x <= mean + 4*std; x += 0.1) {
        labels.push(x.toFixed(1));
        const y = (1 / (std * Math.sqrt(2 * Math.PI))) *
                  Math.exp(-0.5 * Math.pow((x - mean) / std, 2));
        data.push(y);
    }
    return { data, labels };
}

function generateBinomialDist(n, p) {
    const data = [];
    const labels = [];
    for (let k = 0; k <= n; k++) {
        labels.push(k.toString());
        const prob = binomialPMF(n, k, p);
        data.push(prob);
    }
    return { data, labels };
}

function binomialPMF(n, k, p) {
    return combination(n, k) * Math.pow(p, k) * Math.pow(1-p, n-k);
}

function combination(n, k) {
    if (k > n) return 0;
    if (k === 0 || k === n) return 1;
    let result = 1;
    for (let i = 1; i <= k; i++) {
        result *= (n - i + 1) / i;
    }
    return result;
}

function generatePoissonDist(lambda) {
    const data = [];
    const labels = [];
    for (let k = 0; k <= lambda * 3; k++) {
        labels.push(k.toString());
        const prob = poissonPMF(lambda, k);
        data.push(prob);
    }
    return { data, labels };
}

function poissonPMF(lambda, k) {
    return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
}

function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

function generateExponentialDist(lambda) {
    const data = [];
    const labels = [];
    for (let x = 0; x <= 5/lambda; x += 0.1) {
        labels.push(x.toFixed(1));
        const y = lambda * Math.exp(-lambda * x);
        data.push(y);
    }
    return { data, labels };
}

// 신뢰구간 계산
function calculateCI() {
    const mean = parseFloat(document.getElementById('sampleMean').value);
    const std = parseFloat(document.getElementById('sampleStd').value);
    const n = parseInt(document.getElementById('sampleSize').value);
    const confidence = parseInt(document.getElementById('confidenceLevel').value);

    // t-분포 임계값 (간략화)
    const df = n - 1;
    const alpha = (100 - confidence) / 100;
    let t;

    if (confidence === 90) t = 1.645;
    else if (confidence === 95) t = 1.96;
    else if (confidence === 99) t = 2.576;

    // 더 정확한 t값 (df 고려)
    if (df < 30) {
        if (confidence === 95) {
            if (df === 24) t = 2.064;
            else if (df < 10) t = 2.262;
            else t = 2.093;
        }
    }

    const se = std / Math.sqrt(n);
    const margin = t * se;
    const lower = mean - margin;
    const upper = mean + margin;

    const result = `
        <h4>📏 ${confidence}% 신뢰구간 결과</h4>
        <p><strong>표본평균:</strong> ${mean}</p>
        <p><strong>표준오차 (SE):</strong> ${se.toFixed(4)}</p>
        <p><strong>t-값 (df=${df}):</strong> ${t.toFixed(3)}</p>
        <p><strong>오차한계:</strong> ±${margin.toFixed(3)}</p>
        <hr>
        <p><strong>${confidence}% 신뢰구간:</strong> [${lower.toFixed(3)}, ${upper.toFixed(3)}]</p>
        <hr>
        <p>📌 해석: 이러한 방법으로 100번 표본추출하면, 약 ${confidence}번은 모평균을 포함하는 구간이 만들어집니다.</p>
    `;

    showResult('ciResult', result);
}

// t-검정
function performTTest() {
    const mean = parseFloat(document.getElementById('testMean').value);
    const mu0 = parseFloat(document.getElementById('nullMean').value);
    const std = parseFloat(document.getElementById('testStd').value);
    const n = parseInt(document.getElementById('testSize').value);
    const testType = document.getElementById('testType').value;

    const se = std / Math.sqrt(n);
    const t = (mean - mu0) / se;
    const df = n - 1;

    // p-value 근사 (간략화)
    let pValue;
    const absT = Math.abs(t);

    if (absT < 1.96) pValue = 0.05 < absT/1.96 ? 0.05 : 0.1;
    else if (absT < 2.576) pValue = 0.01;
    else pValue = 0.001;

    // 양측검정이면 2배
    if (testType === 'two') pValue *= 2;

    let conclusion;
    const alpha = 0.05;
    if (pValue < alpha) {
        conclusion = `H₀를 기각합니다. 통계적으로 유의한 차이가 있습니다 (p < ${alpha}).`;
    } else {
        conclusion = `H₀를 채택합니다. 통계적으로 유의한 차이가 없습니다 (p ≥ ${alpha}).`;
    }

    const result = `
        <h4>🔬 t-검정 결과</h4>
        <p><strong>귀무가설 (H₀):</strong> μ = ${mu0}</p>
        <p><strong>대립가설 (H₁):</strong> μ ${testType === 'two' ? '≠' : testType === 'right' ? '>' : '<'} ${mu0}</p>
        <hr>
        <p><strong>t-통계량:</strong> ${t.toFixed(4)}</p>
        <p><strong>자유도:</strong> ${df}</p>
        <p><strong>p-value:</strong> ${pValue.toFixed(4)}</p>
        <hr>
        <p><strong>결론:</strong> ${conclusion}</p>
    `;

    showResult('tTestResult', result);
}

// 회귀분석
function performRegression() {
    const xInput = document.getElementById('xValues').value;
    const yInput = document.getElementById('yValues').value;

    const xData = xInput.split(',').map(x => parseFloat(x.trim())).filter(x => !isNaN(x));
    const yData = yInput.split(',').map(y => parseFloat(y.trim())).filter(y => !isNaN(y));

    if (xData.length !== yData.length || xData.length < 2) {
        showResult('regressionResult', '<p class="error">X와 Y의 개수가 같아야 하며, 최소 2개 이상이어야 합니다.</p>', true);
        return;
    }

    const n = xData.length;
    const xMean = xData.reduce((a, b) => a + b, 0) / n;
    const yMean = yData.reduce((a, b) => a + b, 0) / n;

    let numerator = 0;
    let denominator = 0;
    for (let i = 0; i < n; i++) {
        numerator += (xData[i] - xMean) * (yData[i] - yMean);
        denominator += Math.pow(xData[i] - xMean, 2);
    }

    const slope = numerator / denominator;
    const intercept = yMean - slope * xMean;

    // 결정계수 (R²)
    const predictions = xData.map(x => intercept + slope * x);
    const ssRes = yData.reduce((sum, y, i) => sum + Math.pow(y - predictions[i], 2), 0);
    const ssTot = yData.reduce((sum, y) => sum + Math.pow(y - yMean, 2), 0);
    const rSquared = 1 - (ssRes / ssTot);

    // 상관계수
    const r = Math.sqrt(rSquared) * (slope > 0 ? 1 : -1);

    const result = `
        <h4>📈 회귀분석 결과</h4>
        <p><strong>회귀식:</strong> Y = ${intercept.toFixed(4)} + ${slope.toFixed(4)}X</p>
        <p><strong>기울기 (β₁):</strong> ${slope.toFixed(4)}</p>
        <p><strong>절편 (β₀):</strong> ${intercept.toFixed(4)}</p>
        <p><strong>상관계수 (r):</strong> ${r.toFixed(4)}</p>
        <p><strong>결정계수 (R²):</strong> ${rSquared.toFixed(4)}</p>
        <hr>
        <p>📌 해석: X가 1 증가하면 Y는 평균적으로 ${slope.toFixed(4)} 변화합니다.</p>
        <p>📌 R² = ${(rSquared*100).toFixed(2)}%: Y 변동의 ${(rSquared*100).toFixed(2)}%를 X로 설명할 수 있습니다.</p>
    `;

    showResult('regressionResult', result);

    // 산점도와 회귀선 그리기
    createRegressionChart(xData, yData, slope, intercept);
}

function createRegressionChart(xData, yData, slope, intercept) {
    const canvas = document.getElementById('regressionChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (charts.regression) {
        charts.regression.destroy();
    }

    // 회귀선 데이터
    const xMin = Math.min(...xData);
    const xMax = Math.max(...xData);
    const lineData = [
        { x: xMin, y: intercept + slope * xMin },
        { x: xMax, y: intercept + slope * xMax }
    ];

    charts.regression = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: '관측값',
                data: xData.map((x, i) => ({ x: x, y: yData[i] })),
                backgroundColor: 'rgb(52, 152, 219)'
            }, {
                label: '회귀선',
                data: lineData,
                type: 'line',
                borderColor: 'rgb(231, 76, 60)',
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '단순선형회귀'
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: 'X'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Y'
                    }
                }
            }
        }
    });
}

// PCA 시각화
function createPCAVisualization() {
    const canvas = document.getElementById('pcaChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // 시뮬레이션 데이터
    const data = [];
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * 10;
        const y = x * 0.8 + Math.random() * 2;
        data.push({ x, y });
    }

    charts.pca = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: '원본 데이터',
                data: data,
                backgroundColor: 'rgba(52, 152, 219, 0.6)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'PCA 개념: 데이터의 주 방향 찾기'
                },
                legend: {
                    display: true
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Feature 1'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Feature 2'
                    }
                }
            }
        }
    });
}

// 시계열 차트
function createTimeseriesChart() {
    const canvas = document.getElementById('timeseriesChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // 시계열 데이터 생성 (추세 + 계절성 + 노이즈)
    const data = [];
    const labels = [];
    for (let t = 0; t < 48; t++) {
        labels.push(`${Math.floor(t/12) + 2020}-${(t%12 + 1).toString().padStart(2, '0')}`);
        const trend = t * 2;
        const seasonal = 10 * Math.sin(2 * Math.PI * t / 12);
        const noise = (Math.random() - 0.5) * 5;
        data.push(trend + seasonal + noise + 100);
    }

    charts.timeseries = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '매출 (단위: 백만원)',
                data: data,
                borderColor: 'rgb(52, 152, 219)',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '시계열 데이터: 추세 + 계절성 + 랜덤 변동'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '시간'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '매출'
                    }
                }
            }
        }
    });
}

// 베이지안 업데이트
function updateBayesian() {
    const alpha = parseFloat(document.getElementById('priorAlpha').value);
    const beta = parseFloat(document.getElementById('priorBeta').value);
    const success = parseInt(document.getElementById('obsSuccess').value);
    const fail = parseInt(document.getElementById('obsFail').value);

    // 사후분포 파라미터
    const postAlpha = alpha + success;
    const postBeta = beta + fail;

    // 평균
    const priorMean = alpha / (alpha + beta);
    const postMean = postAlpha / (postAlpha + postBeta);

    const result = `
        <h4>🎯 베이지안 업데이트 결과</h4>
        <p><strong>사전분포:</strong> Beta(${alpha}, ${beta})</p>
        <p><strong>사전 평균:</strong> ${priorMean.toFixed(4)}</p>
        <hr>
        <p><strong>관측 데이터:</strong> 성공 ${success}회, 실패 ${fail}회</p>
        <hr>
        <p><strong>사후분포:</strong> Beta(${postAlpha}, ${postBeta})</p>
        <p><strong>사후 평균:</strong> ${postMean.toFixed(4)}</p>
        <hr>
        <p>📌 해석: 데이터를 관측한 후, 성공 확률의 추정값이 ${priorMean.toFixed(4)}에서 ${postMean.toFixed(4)}로 업데이트되었습니다.</p>
    `;

    showResult('bayesianResult', result);
    createBayesianChart(alpha, beta, postAlpha, postBeta);
}

function createBayesianChart(alpha, beta, postAlpha, postBeta) {
    const canvas = document.getElementById('bayesianChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (charts.bayesian) {
        charts.bayesian.destroy();
    }

    // Beta 분포 생성
    const priorData = [];
    const postData = [];
    const labels = [];

    for (let p = 0; p <= 1; p += 0.01) {
        labels.push(p.toFixed(2));
        priorData.push(betaPDF(p, alpha, beta));
        postData.push(betaPDF(p, postAlpha, postBeta));
    }

    charts.bayesian = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '사전분포',
                data: priorData,
                borderColor: 'rgb(149, 165, 166)',
                backgroundColor: 'rgba(149, 165, 166, 0.1)',
                fill: true
            }, {
                label: '사후분포',
                data: postData,
                borderColor: 'rgb(52, 152, 219)',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '베이지안 업데이트: 사전분포 → 사후분포'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '확률 (θ)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '밀도'
                    }
                }
            }
        }
    });
}

function betaPDF(x, alpha, beta) {
    if (x <= 0 || x >= 1) return 0;
    // 간략화된 Beta PDF (정규화 상수 생략)
    return Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1);
}

// A/B 테스트
function performABTest() {
    const nA = parseInt(document.getElementById('visitorsA').value);
    const cA = parseInt(document.getElementById('conversionsA').value);
    const nB = parseInt(document.getElementById('visitorsB').value);
    const cB = parseInt(document.getElementById('conversionsB').value);

    const pA = cA / nA;
    const pB = cB / nB;
    const pPool = (cA + cB) / (nA + nB);

    // z-검정
    const se = Math.sqrt(pPool * (1 - pPool) * (1/nA + 1/nB));
    const z = (pB - pA) / se;
    const pValue = 2 * (1 - normalCDF(Math.abs(z)));

    // 상대적 향상
    const relativeImprovement = ((pB - pA) / pA) * 100;

    let conclusion;
    if (pValue < 0.05) {
        conclusion = `통계적으로 유의한 차이가 있습니다 (p < 0.05). ${pB > pA ? 'B' : 'A'}가 더 우수합니다.`;
    } else {
        conclusion = `통계적으로 유의한 차이가 없습니다 (p ≥ 0.05).`;
    }

    const result = `
        <h4>🧪 A/B 테스트 결과</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
                <h5>그룹 A (대조군)</h5>
                <p>전환율: ${(pA*100).toFixed(2)}%</p>
                <p>${cA} / ${nA}</p>
            </div>
            <div>
                <h5>그룹 B (실험군)</h5>
                <p>전환율: ${(pB*100).toFixed(2)}%</p>
                <p>${cB} / ${nB}</p>
            </div>
        </div>
        <hr>
        <p><strong>차이:</strong> ${((pB - pA)*100).toFixed(2)}%p</p>
        <p><strong>상대적 향상:</strong> ${relativeImprovement.toFixed(2)}%</p>
        <p><strong>z-통계량:</strong> ${z.toFixed(4)}</p>
        <p><strong>p-value:</strong> ${pValue.toFixed(4)}</p>
        <hr>
        <p><strong>결론:</strong> ${conclusion}</p>
    `;

    showResult('abTestResult', result);
}

function normalCDF(z) {
    // 표준정규분포 누적분포함수 근사
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp(-z * z / 2);
    const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return z > 0 ? 1 - prob : prob;
}

// 중심극한정리 시뮬레이션
function updateCLTLabel() {
    const size = document.getElementById('cltSampleSize').value;
    document.getElementById('cltSizeLabel').textContent = size;
}

function runCLTSimulation() {
    const dist = document.getElementById('popDist').value;
    const n = parseInt(document.getElementById('cltSampleSize').value);
    const iterations = parseInt(document.getElementById('cltIterations').value);

    const sampleMeans = [];

    for (let i = 0; i < iterations; i++) {
        const sample = [];
        for (let j = 0; j < n; j++) {
            let value;
            if (dist === 'uniform') {
                value = Math.random();
            } else if (dist === 'exponential') {
                value = -Math.log(1 - Math.random());
            } else if (dist === 'bimodal') {
                value = Math.random() < 0.5 ? Math.random() * 0.3 : 0.7 + Math.random() * 0.3;
            }
            sample.push(value);
        }
        const mean = sample.reduce((a, b) => a + b, 0) / n;
        sampleMeans.push(mean);
    }

    createCLTChart(sampleMeans);
}

function createCLTChart(sampleMeans) {
    const canvas = document.getElementById('cltChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (charts.clt) {
        charts.clt.destroy();
    }

    // 히스토그램 생성
    const min = Math.min(...sampleMeans);
    const max = Math.max(...sampleMeans);
    const bins = 30;
    const binWidth = (max - min) / bins;

    const histogram = new Array(bins).fill(0);
    const labels = [];

    for (let i = 0; i < bins; i++) {
        const binStart = min + i * binWidth;
        labels.push(binStart.toFixed(2));
    }

    sampleMeans.forEach(mean => {
        const binIndex = Math.min(Math.floor((mean - min) / binWidth), bins - 1);
        histogram[binIndex]++;
    });

    charts.clt = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '표본평균의 분포',
                data: histogram,
                backgroundColor: 'rgba(52, 152, 219, 0.7)',
                borderColor: 'rgb(52, 152, 219)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '중심극한정리: 표본평균은 정규분포를 따릅니다'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '표본평균'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '빈도'
                    }
                }
            }
        }
    });
}

// 상관관계 예제
function createCorrelationExample() {
    const canvas = document.getElementById('correlationChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // 아이스크림 판매와 익사 사고 (모두 기온과 상관)
    const data = [];
    for (let temp = 15; temp <= 35; temp += 2) {
        const icecream = temp * 10 + Math.random() * 20;
        const drowning = temp * 0.5 + Math.random() * 2;
        data.push({ x: icecream, y: drowning });
    }

    charts.correlation = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: '아이스크림 판매량 vs 익사 사고',
                data: data,
                backgroundColor: 'rgba(231, 76, 60, 0.6)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '높은 상관관계 ≠ 인과관계'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '아이스크림 판매량'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '익사 사고 건수'
                    }
                }
            }
        }
    });
}

// 표본 크기 계산
function calculateSampleSize() {
    const effectSize = parseFloat(document.getElementById('effectSize').value);
    const power = parseFloat(document.getElementById('power').value);
    const alpha = parseFloat(document.getElementById('alpha').value);

    // Cohen's d를 이용한 간략한 계산
    const zAlpha = alpha === 0.05 ? 1.96 : alpha === 0.01 ? 2.576 : 1.645;
    const zBeta = power === 0.8 ? 0.84 : power === 0.9 ? 1.28 : 0.52;

    const n = Math.ceil(2 * Math.pow((zAlpha + zBeta) / effectSize, 2));

    const result = `
        <h4>📏 표본 크기 계산 결과</h4>
        <p><strong>효과 크기 (Cohen's d):</strong> ${effectSize}</p>
        <p><strong>검정력 (Power):</strong> ${power} (${power*100}%)</p>
        <p><strong>유의수준 (α):</strong> ${alpha}</p>
        <hr>
        <p><strong>필요한 표본 크기 (각 그룹):</strong> ${n}명</p>
        <p><strong>총 표본 크기:</strong> ${n * 2}명</p>
        <hr>
        <p>📌 효과 크기 기준:</p>
        <p>• 작은 효과: d = 0.2</p>
        <p>• 중간 효과: d = 0.5</p>
        <p>• 큰 효과: d = 0.8</p>
    `;

    showResult('sampleSizeResult', result);
}

// 퀴즈 체크
function checkAnswer(questionId, answer, isCorrect) {
    const feedback = document.getElementById(`${questionId}-feedback`);
    const buttons = event.target.parentElement.querySelectorAll('button');

    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn === event.target) {
            btn.classList.add(isCorrect ? 'correct' : 'incorrect');
        }
    });

    if (isCorrect) {
        feedback.innerHTML = '✅ 정답입니다! 중앙값은 이상치에 영향을 적게 받습니다.';
        feedback.style.backgroundColor = 'rgba(39, 174, 96, 0.2)';
    } else {
        feedback.innerHTML = '❌ 틀렸습니다. 다시 생각해보세요.';
        feedback.style.backgroundColor = 'rgba(231, 76, 60, 0.2)';
    }

    feedback.classList.add('show');
}

// 진행도 관리
function loadProgress() {
    const saved = localStorage.getItem('statsProgress');
    if (saved) {
        const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
        const progress = JSON.parse(saved);
        checkboxes.forEach((cb, i) => {
            if (progress[i]) {
                cb.checked = true;
            }
        });
    }
}

function updateProgress() {
    const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
    const total = checkboxes.length;
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;

    const progress = Math.round((checked / total) * 100);

    // 저장
    const progressArray = Array.from(checkboxes).map(cb => cb.checked);
    localStorage.setItem('statsProgress', JSON.stringify(progressArray));

    // 표시
    const totalProgressEl = document.getElementById('totalProgress');
    const completedTopicsEl = document.getElementById('completedTopics');

    if (totalProgressEl) {
        totalProgressEl.textContent = `${progress}%`;
    }

    if (completedTopicsEl) {
        completedTopicsEl.textContent = checked;
    }

    // 학습 시간 (분)
    const studyTime = Math.floor((Date.now() - studyStartTime) / 60000);
    const studyTimeEl = document.getElementById('studyTime');
    if (studyTimeEl) {
        studyTimeEl.textContent = studyTime;
    }

    // 진행도 차트 업데이트
    createProgressChart(checked, total - checked);
}

function createProgressChart(completed, remaining) {
    const canvas = document.getElementById('progressChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (charts.progress) {
        charts.progress.destroy();
    }

    charts.progress = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['완료', '미완료'],
            datasets: [{
                data: [completed, remaining],
                backgroundColor: [
                    'rgba(39, 174, 96, 0.8)',
                    'rgba(189, 195, 199, 0.8)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '학습 진행도'
                },
                legend: {
                    display: true,
                    position: 'bottom'
                }
            }
        }
    });
}

// 유틸리티 함수
function showResult(elementId, html, isError = false) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = html;
        element.style.display = 'block';
        if (isError) {
            element.classList.add('error');
        } else {
            element.classList.remove('error');
        }
    }
}

// 스크롤 시 네비게이션 하이라이트
window.addEventListener('scroll', function() {
    // 선택적 구현
});

// 키보드 단축키
document.addEventListener('keydown', function(e) {
    // 화살표 키로 섹션 이동
    if (e.key === 'ArrowRight') {
        // 다음 섹션
    } else if (e.key === 'ArrowLeft') {
        // 이전 섹션
    }
});

console.log('📊 통계학 학습 가이드가 로드되었습니다!');
console.log('💡 팁: 계산기를 활용해서 직접 값을 입력해보세요!');
