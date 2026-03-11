import { timeAgo } from "./timeAgo";

describe("timeAgo", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-03-10T12:00:00Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns seconds ago when less than 60 seconds", () => {
    const date = new Date("2026-03-10T11:59:30Z"); // 30s ago
    expect(timeAgo(date)).toBe("30 seconds ago");
  });

  it("returns minutes ago when less than 1 hour", () => {
    const date = new Date("2026-03-10T11:45:00Z"); // 15min ago
    expect(timeAgo(date)).toBe("15 minutes ago");
  });

  it("returns hours ago when less than 24 hours", () => {
    const date = new Date("2026-03-10T09:00:00Z"); // 3h ago
    expect(timeAgo(date)).toBe("3 hours ago");
  });

  it("returns days ago when 24 hours or more", () => {
    const date = new Date("2026-03-08T12:00:00Z"); // 2 days ago
    expect(timeAgo(date)).toBe("2 days ago");
  });

  it("accepts a string date", () => {
    expect(timeAgo("2026-03-10T11:59:00Z")).toBe("1 minutes ago");
  });
});
