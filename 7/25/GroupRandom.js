function GroupRandom(students, n) {
    // สุ่ม
  const shuffled = students.sort(() => Math.random() - 0.5);
  // เก็บ
  const total = shuffled.length;
  // คำนวณ n กลุ่ม แล้วปัดลง
  const groupCount = Math.floor(total / n);
  //หาเศษ
  const remainder = total % n;

  //เก็บค่าที่แบ่งเสร็จแล้ว
  const result = [];
  let index = 0;
  //ตำแหน่งเริ่มตัด

  // สร้างกลุ่ม
  for (let i = 0; i < groupCount; i++) {


    // size ของกลุ่ม
    // i > remainder +group n+1
    // เศษ + groupfrist
    const groupSize = i < remainder ? n + 1 : n;
    // ตัดสมาชิกจาก shuffled index - index+groupSize มาเป็นกลุ่ม new
    result.push(shuffled.slice(index, index + groupSize));
    // เลื่อนไป
    index += groupSize;
  }

  return result;
}
