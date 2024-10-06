import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    personalInfo: {
      fullName: { type: String, required: true },
      birthDate: { type: Date, required: true },
      birthPlace: { type: String, required: true },
      nationality: { type: String, required: true },
    },
    workInfo: {
      skills: [String],
      projects: [
        {
          projectName: String,
          content: String,
          role: String,
          startDate: Date,
          endDate: Date,
        },
      ],
      workHistory: [
        {
          companyName: String,
          role: String,
          startDate: Date,
          endDate: Date,
        },
      ],
    },
    additionalInfo: {
      hobbies: [String],
      goals: [String],
    },
  },
  { timestamps: true }
);

const ProfileModel = mongoose.model("profiles", profileSchema);
export default ProfileModel;
