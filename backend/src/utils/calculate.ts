const salaryData = [
  { salary: 10000000, netIncome: 771033 },
  { salary: 11000000, netIncome: 847286 },
  { salary: 12000000, netIncome: 923500 },
  { salary: 13000000, netIncome: 998863 },
  { salary: 14000000, netIncome: 1073736 },
  { salary: 15000000, netIncome: 1148580 },
  { salary: 16000000, netIncome: 1223463 },
  { salary: 17000000, netIncome: 1297826 },
  { salary: 18000000, netIncome: 1372040 },
  { salary: 19000000, netIncome: 1446313 },
  { salary: 20000000, netIncome: 1520566 },
  { salary: 21000000, netIncome: 1594790 },
  { salary: 22000000, netIncome: 1669043 },
  { salary: 23000000, netIncome: 1743296 },
  { salary: 24000000, netIncome: 1817310 },
  { salary: 25000000, netIncome: 1890463 },
  { salary: 26000000, netIncome: 1963596 },
  { salary: 27000000, netIncome: 2036710 },
  { salary: 28000000, netIncome: 2109853 },
  { salary: 29000000, netIncome: 2179916 },
  { salary: 30000000, netIncome: 2248340 },
  { salary: 31000000, netIncome: 2316813 },
  { salary: 32000000, netIncome: 2384896 },
  { salary: 33000000, netIncome: 2451470 },
  { salary: 34000000, netIncome: 2515923 },
  { salary: 35000000, netIncome: 2580346 },
  { salary: 36000000, netIncome: 2656670 },
  { salary: 37000000, netIncome: 2723873 },
  { salary: 38000000, netIncome: 2788286 },
  { salary: 39000000, netIncome: 2852700 },
  { salary: 40000000, netIncome: 2917143 },
  { salary: 41000000, netIncome: 2981576 },
  { salary: 42000000, netIncome: 3045970 },
  { salary: 43000000, netIncome: 3110423 },
  { salary: 44000000, netIncome: 3174836 },
  { salary: 45000000, netIncome: 3239250 },
  { salary: 46000000, netIncome: 3303693 },
  { salary: 47000000, netIncome: 3362136 },
  { salary: 48000000, netIncome: 3425500 },
  { salary: 49000000, netIncome: 3488923 },
  { salary: 50000000, netIncome: 3552316 },
  { salary: 60000000, netIncome: 4183470 },
  { salary: 70000000, netIncome: 4785823 },
  { salary: 80000000, netIncome: 5313816 },
  { salary: 90000000, netIncome: 5868840 },
  { salary: 100000000, netIncome: 6423903 },
  { salary: 110000000, netIncome: 6968006 },
  { salary: 120000000, netIncome: 7418310 },
  { salary: 130000000, netIncome: 7892100 },
  { salary: 140000000, netIncome: 8331740 },
  { salary: 150000000, netIncome: 8745980 },
];

/**
 * 연봉을 입력받아 월급 실수령액을 계산하는 함수
 * @param annualSalary 연봉 (원 단위)
 * @returns 월급 실수령액 (원 단위)
 * @throws 연봉 범위를 벗어난 경우 에러 발생
 * @example
 * computeMonthlyPayAfterTax(30000000); // 2248340
 * computeMonthlyPayAfterTax(50000000); // 3552316
 */

function computeMonthlyPayAfterTax(annualSalary: number): number {
  // 입력 값이 데이터 범위 내에 있는지 확인
  if (annualSalary <= salaryData[0].salary) {
    return salaryData[0].netIncome;
  } else if (annualSalary >= salaryData[salaryData.length - 1].salary) {
    return salaryData[salaryData.length - 1].netIncome;
  }

  // 보간법을 사용해 실수령액 계산
  for (let i = 0; i < salaryData.length - 1; i++) {
    const current = salaryData[i];
    const next = salaryData[i + 1];

    if (annualSalary >= current.salary && annualSalary <= next.salary) {
      const ratio =
        (annualSalary - current.salary) / (next.salary - current.salary);
      return Math.round(
        current.netIncome + ratio * (next.netIncome - current.netIncome),
      );
    }
  }

  // 범위를 벗어난 경우 (기본적으로 처리될 일 없음)
  throw new Error('연봉 범위를 벗어났습니다.');
}

export default computeMonthlyPayAfterTax;
