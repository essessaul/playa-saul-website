export async function getAvailabilityCalendar() {
  return Array.from({ length: 35 }).map((_, index) => ({
    day: index + 1,
    status: [5,6,7,12,13,18,19,20,27].includes(index)
      ? "booked"
      : [9,10,24].includes(index)
      ? "blocked"
      : "available"
  }));
}
