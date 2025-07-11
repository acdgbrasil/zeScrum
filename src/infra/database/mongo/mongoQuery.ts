import { UserProfile } from "../../../core/types/userProfile.ts";
import { UserProfileModel } from "./schemas/userProfileSchema.ts";

export const findByUserId = async (userId: string) => {
    try{
        const findById =  await UserProfileModel.findById({userId: userId});
        return findById != null ? findById : 404;
    } catch (error) {
        throw new Error(`Failed to find user by ID: ${error instanceof Error ? error.message : String(error)}`);
    }
}

export const createUserProfile = async (userProfile: UserProfile) => {
    try {
        const userProfileExist = await findByUserId(userProfile.userId);
        if (userProfileExist !== 404) return 400; 
        const newUserProfile = await UserProfileModel.create(userProfile);
        return newUserProfile;
    } catch (error) {
        throw new Error(`Failed to create user profile: ${error instanceof Error ? error.message : String(error)}`);
    }
}

