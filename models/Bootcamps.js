const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");
const slugify = require("slugify");

const BootCampSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Name is a require field"],
      maxlength: [50, "Name of bootcamp cannot be more than 50 characters"],
    },
    slug: String,
    description: {
      type: String,
      required: [true, "Description is a require field"],
      minlength: [20, "Description cannot be less than 20 characters"],
    },
    address: {
      type: String,
      required: [true, "Address is a require field"],
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        // required: true,
      },
      coordinates: {
        type: [Number],
        // required: true,
        index: "2dsphere",
      },
      formatedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "Please use a valid www, http or https",
      ],
    },
    email: {
      type: String,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please use a valid email address",
      ],
    },
    careers: {
      type: [String],
      required: [true, "Career is a require field"],
      enum: [
        "Web Development",
        "Mobile Development",
        "UI/UX",
        "Data Science",
        "Business",
        "Others",
      ],
    },
    averageRating: {
      type: Number,
      min: [1, "Rating must start from atleast 1"],
      max: [5, "Rating must not be more than 10"],
    },
    averageCost: {
      type: Number,
    },
    photo: {
      type: String,
      default: "avatar.jpg",
    },
    housing: {
      type: Boolean,
      default: false,
    },
    jobGuarantee: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: [true, "User id is require"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// slugify
BootCampSchema.pre("save", async function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// save location
BootCampSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  const location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    country: loc[0].countryCode,
    zipcode: loc[0].zipcode,
  };

  console.log(location);

  this.location = location;

  this.address = undefined;

  next();
});

// reverse population with virtual
BootCampSchema.virtual("courses", {
  ref: "course",
  localField: "_id",
  foreignField: "bootcamp",
  justOne: false,
});

// delete cascade courses
BootCampSchema.pre("remove", async function (next) {
  await this.model("course").deleteMany({ bootcamp: this._id });
  next();
});

module.exports = mongoose.model("bootcamp", BootCampSchema);
