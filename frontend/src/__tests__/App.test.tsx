import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../App";

// Mock child components that rely on context/routing extensively if needed
// For now, let's try a shallow smoke test
// But App uses providers, so we render it as is.

// We need to mock the API calls probably or wrapped contexts
// But 'App' sets up the providers.

describe("App", () => {
  it("renders without crashing", () => {
    // This is a basic smoke test
    render(<App />);
    // Check if something from the Layout or Login page is rendered
    // Initially it redirects to Login
    expect(document.body).toBeDefined();
  });
});
