import { Err } from "../helper/Err.js";
import Doctor from "../model/Doctor.js";
export const findDoctor = async (req, res, next) => {
	let { query } = req.body;
	try {
		let doc = await Doctor.find({
			$or: [
				{ name: { $regex: query, $options: "i" } },
				{ servicePincode: { $regex: query, $options: "i" } },
				{ address: { $regex: query, $options: "i" } },
				{ disease: { $regex: query, $options: "i" } },
			],
		});
		if (!doc) {
			throw new Err(422, "Something went wrong");
		}
		res.status(200).send(doc);
	} catch (error) {
		next(error);
	}
};
export const setDoctor = async (req, res, next) => {
	let {
		name,
		address,
		servicePincode,
		qualification,
		experience,
		disease,
		specialist,
		contactDetail,
	} = req.body;
	try {
		let task = await Doctor.create({
			name: name,
			address: address,
			servicePincode: servicePincode,
			qualification: qualification,
			experience: Number(experience),
			disease: disease,
			specialist: specialist,
			contactDetail: contactDetail,
		});
		if (!task) {
			throw new Err(422, "Something went wrong!");
		}
		res.status(200).json({
			message: "Doctor uploaded successfully",
		});
	} catch (error) {
		next(error);
	}
};
