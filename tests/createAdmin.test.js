const seedAdmin = require("../seeds/createAdmin");
const Admin = require("../src/models/admin");
const hashPassword = require("../src/utils/hashPassword");

// Mock Admin model
jest.mock("../src/models/admin", () => ({
    findOne: jest.fn(),
    create: jest.fn(),
}));

// Mock hashPassword utility function
jest.mock("../src/utils/hashPassword", () => jest.fn());

describe("seedAdmin", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should create admin if none exists", async () => {
        // Mock findOne to return null, indicating no existing admin
        Admin.findOne.mockResolvedValueOnce(null);

        // Mock hashPassword to return hashed password
        hashPassword.mockResolvedValueOnce("hashedPassword");

        await seedAdmin();

        // Expect Admin.create to be called with expected username and hashed password
        expect(Admin.create).toHaveBeenCalledWith({ username: "admin", password: "hashedPassword" });
    });

    it("should skip seeding if admin already exists", async () => {
        // Mock findOne to return existing admin
        Admin.findOne.mockResolvedValueOnce({});

        await seedAdmin();

        // Expect Admin.create not to have been called
        expect(Admin.create).not.toHaveBeenCalled();
    });
});
