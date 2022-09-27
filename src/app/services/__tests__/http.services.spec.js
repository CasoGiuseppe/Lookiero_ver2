import { describe, beforeEach, test, expect, vi } from "vitest";
import { get } from "@/app/services/http.services.js";

const mockResponse = { owner: false, name: "me" };
window.global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockResponse),
  })
);

describe("Service: HTTP", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("GET: should return correct API response", async () => {
    const users = await get({ url: "http://mockUrl.com" });
    expect(users).toMatchObject(mockResponse);
  });
});
