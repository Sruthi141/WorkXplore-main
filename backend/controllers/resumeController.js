import pdfParse from "pdf-parse";
import mammoth from "mammoth";

const extractTextFromFile = async (file) => {
  if (!file) throw new Error("Resume file is required");

  if (file.mimetype === "application/pdf") {
    const data = await pdfParse(file.buffer);
    return data.text || "";
  }

  if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    const result = await mammoth.extractRawText({ buffer: file.buffer });
    return result.value || "";
  }

  throw new Error("Unsupported resume file type");
};

const tokenize = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

const getKeywordStats = (resumeTokens, jdTokens) => {
  const resumeSet = new Set(resumeTokens);
  const jdSet = new Set(jdTokens);

  const common = [];
  const missing = [];

  jdSet.forEach((word) => {
    if (resumeSet.has(word)) common.push(word);
    else missing.push(word);
  });

  return { common, missing };
};

const computeScore = (resumeTokens, jdTokens) => {
  if (!jdTokens.length) return 0;
  const { common } = getKeywordStats(resumeTokens, jdTokens);
  const ratio = common.length / jdTokens.length;
  return Math.round(Math.min(100, ratio * 100));
};

const inferSkills = (tokens) => {
  const SKILL_KEYWORDS = [
    "javascript",
    "typescript",
    "react",
    "node",
    "express",
    "mongodb",
    "sql",
    "python",
    "java",
    "aws",
    "docker",
    "kubernetes",
    "tailwind",
    "figma",
  ];
  const set = new Set(tokens);
  return SKILL_KEYWORDS.filter((s) => set.has(s));
};

export const scoreResume = async (req, res, next) => {
  try {
    const file = req.file;
    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Job description is required",
        data: null,
        error: null,
      });
    }

    const resumeText = await extractTextFromFile(file);
    const jdText = String(jobDescription);

    const resumeTokens = tokenize(resumeText);
    const jdTokens = tokenize(jdText);

    const score = computeScore(resumeTokens, jdTokens);
    const { common, missing } = getKeywordStats(resumeTokens, jdTokens);
    const extractedSkills = inferSkills(resumeTokens);

    const strengths = [
      score > 70 && "Your resume strongly aligns with the job description.",
      extractedSkills.length && `Highlighted skills: ${extractedSkills.join(", ")}`,
    ].filter(Boolean);

    const suggestions = [];
    if (score < 70) {
      suggestions.push(
        "Include more of the role-specific keywords from the job description.",
        "Add measurable impact (metrics, outcomes) for your past roles.",
        "Make sure your tech stack and tools match those requested in the JD."
      );
    }
    if (!extractedSkills.length) {
      suggestions.push("Add a dedicated skills section listing your core technologies.");
    }

    return res.status(200).json({
      success: true,
      message: "Resume scored successfully",
      data: {
        score,
        missingKeywords: missing.slice(0, 30),
        strengths,
        suggestions,
        extractedSkills,
      },
      error: null,
    });
  } catch (error) {
    return next(error);
  }
};

