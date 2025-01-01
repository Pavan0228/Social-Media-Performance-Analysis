import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        // Generate access token and refresh token
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Save the refresh token in the database
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Authentication token generation failed. Please try again.",
            error: "Internal server error during token generation"
        });
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, username } = req.body;

    // Check if all fields are provided
    if (
        !fullName?.trim() ||
        !email?.trim() ||
        !password?.trim() ||
        !username?.trim()
    ) {
        return res.status(400).json({
            success: false,
            message: "Registration failed. Please provide all required information.",
            error: "Missing required fields: Full Name, Email, Password, and Username are mandatory"
        });
    }

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
        return res.status(409).json({
            success: false,
            message: "Registration failed. Account already exists.",
            error: "An account with this email or username is already registered"
        });
    }

    // Create the new user
    const user = await User.create({ fullName, email, password, username });

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Registration failed. Please try again.",
            error: "User creation unsuccessful"
        });
    }

    // Generate access token and refresh token
    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);

    // Remove sensitive fields before sending response
    const userData = user.toObject();
    delete userData.password;
    delete userData.refreshToken;

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(201)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json({
            success: true,
            message: "Registration successful. Welcome to our platform!",
            user: userData,
            accessToken,
        });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    // Check if all fields are provided
    if ((!email && !username) || !password) {
        return res.status(400).json({
            success: false,
            message: "Login failed. Please provide all required information.",
            error: "Missing credentials. Please provide either email or username, and password"
        });
    }

    // Find user by email or username
    let user;
    if (email) {
        user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Login failed. Account not found.",
                error: "No account found with this email address"
            });
        }
    } else if (username) {
        user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Login failed. Account not found.",
                error: "No account found with this username"
            });
        }
    }

    // Check if password is correct
    const isPasswordCorrect = await user.checkPassword(password);

    if (!isPasswordCorrect) {
        return res.status(401).json({
            success: false,
            message: "Login failed. Invalid credentials.",
            error: "Incorrect password provided"
        });
    }

    // Generate access token and refresh token
    const { accessToken, refreshToken } =
        await generateAccessTokenAndRefreshToken(user._id);

    // Remove sensitive fields before sending response
    const userData = user.toObject();
    delete userData.password;
    delete userData.refreshToken;

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json({
            success: true,
            message: "Login successful. Welcome back!",
            user: userData,
            accessToken,
        });
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req?.user?._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("refreshToken", options)
        .clearCookie("accessToken", options)
        .json({
            success: true,
            message: "Logout successful. See you again soon!",
        });
});

export { registerUser, loginUser, logoutUser };