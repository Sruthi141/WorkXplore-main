import Joi from "joi";

export const validate = (schema) => (req, res, next) => {
  const toValidate = {};
  if (schema.body) toValidate.body = req.body;
  if (schema.query) toValidate.query = req.query;
  if (schema.params) toValidate.params = req.params;

  const { error } = Joi.compile(schema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(toValidate);

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      data: null,
      error: error.details.map((d) => d.message),
    });
  }
  return next();
};

export const authSchemas = {
  register: {
    body: Joi.object({
      fullname: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.number().required(),
      password: Joi.string().min(6).required(),
      role: Joi.string().valid("student", "recruiter", "admin").required(),
    }),
  },
  login: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      role: Joi.string().valid("student", "recruiter", "admin").required(),
    }),
  },
};

export const jobSchemas = {
  post: {
    body: Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      requirements: Joi.string().required(),
      salary: Joi.number().required(),
      location: Joi.string().required(),
      jobType: Joi.string().required(),
      experience: Joi.number().required(),
      position: Joi.number().required(),
      companyId: Joi.string().required(),
    }),
  },
  list: {
    query: Joi.object({
      keyword: Joi.string().allow(""),
      companies: Joi.string().allow(""),
      industries: Joi.string().allow(""),
      minSalary: Joi.number().integer().min(0).allow(""),
      maxSalary: Joi.number().integer().min(0).allow(""),
      jobType: Joi.string().allow(""),
      sort: Joi.string().valid("salary_asc", "salary_desc", "latest").allow(""),
      location: Joi.string().allow(""),
      experience: Joi.number().integer().min(0).allow(""),
      postedDate: Joi.string().valid("24h", "7d", "30d").allow(""),
    }),
  },
};

export const applicationSchemas = {
  apply: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
};

export const paymentSchemas = {
  confirm: {
    body: Joi.object({
      paymentIntentId: Joi.string().required(),
      plan: Joi.string().valid("basic", "pro", "enterprise").required(),
    }),
  },
};

export const resumeSchemas = {
  score: {
    body: Joi.object({
      jobDescription: Joi.string().required(),
    }),
  },
};

