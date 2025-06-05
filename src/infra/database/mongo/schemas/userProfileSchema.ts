const {mongoConnectio} = await import("../mongoConnection.ts")
const {Schema} = await mongoConnectio();
import { UserProfile,Profile,IdealCharge,ProfileHistoryInSprint,Task_Delivery,META_DATA,ActualSprintPerformance } from "../../../../core/types/userProfile.ts";

const ProfileSchema = new Schema<Profile>({
  comunicacationPreferences: String,
  workStyle: String,
  badTriggers: [String],
  motivations: [String],
  reactions: [String],
}, { _id: false });

const IdealChargeSchema = new Schema<IdealCharge>({
  frequency: String,
  hour_to_charge: Date,
  LastedCharge: Date,
  chargeValue: Number,
  toneOfVoice: [String],
  styleOfCharge: [String],
  communicationToneExamples: [String],
  preferredTimeToBeCharged: [String],
}, { _id: false });

const ProfileHistoryInSprintSchema = new Schema<ProfileHistoryInSprint>({
  numberOfSprint: Number,
  delays: Number,
  compliments: Number,
  amountOfTaskSwitching: Number,
  timesFailedToRespondTheBot: Number,
  importantEvents: [String],
}, { _id: false });

const TaskDeliverySchema = new Schema<Task_Delivery>({
  cardId: String,
  cardTitle: String,
  status: String,
  initialDate: Date,
  finalDate: Date,
  deliveryDate: Date,
  cardPoint: Number,
  observations: [String],
}, { _id: false });

const MetaDataSchema = new Schema<META_DATA>({
  numberOfTasks: Number,
  numberOfPoints: Number,
  numberOfProfileHasPercentOfAtualSprint: Number,
  numberOfPointsProfileHasDeliveredOfFinalSprint: Number,
  numberOfPointsProfileHasDeliveredOfSprintBacklog: Number,
  profileConfiability: Number,
  lastAtualization: Date,
  whoCreateAt: String,
  whoUpdateAt: String,
  createAt: Date,
  updateAt: Date,
  trustLevelTag: String,
}, { _id: false });

const ActualSprintPerformanceSchema = new Schema<ActualSprintPerformance>({
  numberOfSprint: Number,
  observations: [String],
  tasksDelivery: [TaskDeliverySchema],
  metaData: MetaDataSchema,
  profileHistoryInSprint: [ProfileHistoryInSprintSchema],
}, { _id: false });

const UserProfileSchema = new Schema<UserProfile>({
  userId: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  teamFunctions: [{ type: String }],
  teamLevel: { type: String },
  firstContact: { type: Date, default: Date.now },
  profile: ProfileSchema,
  idealCharge: IdealChargeSchema,
  profileHistoryInSprint: [ActualSprintPerformanceSchema],
  lastContactWithBot: Date,
});

const structMongoClient = await mongoConnectio();
export const UserProfileModel = structMongoClient.db.model("userProfile",UserProfileSchema,"userProfile");