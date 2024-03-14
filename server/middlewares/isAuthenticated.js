const jwt = requrie("jsonwebtoken");
const User = requrie("../models/User");
//this recieves tokens as request from any route from "common-route.js" that uses protectRoute.
//checks if the user is authenticated or not.

const protectRoute = async (req, res, next) => {
	console.log("protectRoute triggered.");

	try {
		//gets token from the cookie - generateToken.js
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		// if token is present and valid then use the decoded user data to find user in db.
		//everything is forwarded except password
		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;
		return res.status(200).json(User);

	} catch (error) {
		//any other errors not from the above statements(due to logic or internal problems)
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;