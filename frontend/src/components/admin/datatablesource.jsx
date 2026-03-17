const DEFAULT_AVATAR = "/default-avatar.png";

const rolePill = (role) => {
  switch (role) {
    case "student":
      return "bg-emerald-500/12 text-emerald-600 border-emerald-500/20 dark:text-emerald-300";
    case "recruiter":
      return "bg-amber-500/12 text-amber-600 border-amber-500/20 dark:text-amber-300";
    case "admin":
      return "bg-rose-500/12 text-rose-600 border-rose-500/20 dark:text-rose-300";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const ShortId = ({ id }) => {
  const short = typeof id === "string" ? `${id.slice(0, 6)}…${id.slice(-4)}` : "—";
  return (
    <span className="font-mono text-xs text-muted-foreground">
      {short}
    </span>
  );
};

export const userColomns = [
  {
    field: "_id",
    headerName: "ID",
    width: 150,
    renderCell: (params) => <ShortId id={params.row._id} />,
  },
  {
    field: "user",
    headerName: "Student",
    width: 260,
    renderCell: (params) => {
      const name = params.row.fullname || "Unnamed";
      const avatar = params.row.profile?.profilePhoto || DEFAULT_AVATAR;

      return (
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt="avatar"
            className="h-9 w-9 rounded-xl object-cover border border-border"
            onError={(e) => {
              e.currentTarget.src = DEFAULT_AVATAR;
            }}
          />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-foreground">
              {name}
            </div>
            <div className="truncate text-xs text-muted-foreground">
              {params.row.email || "—"}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 260,
    renderCell: (params) => (
      <span className="text-sm text-foreground">{params.row.email || "—"}</span>
    ),
  },
  {
    field: "role",
    headerName: "Role",
    width: 160,
    renderCell: (params) => (
      <div
        className={[
          "inline-flex items-center justify-center",
          "rounded-full border px-3 py-1 text-xs font-semibold capitalize",
          rolePill(params.row.role),
        ].join(" ")}
      >
        {params.row.role || "—"}
      </div>
    ),
  },
];

export const recruiterColomns = [
  {
    field: "_id",
    headerName: "ID",
    width: 150,
    renderCell: (params) => <ShortId id={params.row._id} />,
  },
  {
    field: "user",
    headerName: "Recruiter",
    width: 260,
    renderCell: (params) => {
      const name = params.row.fullname || "Unnamed";
      const avatar = params.row.profile?.profilePhoto || DEFAULT_AVATAR;

      return (
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt="avatar"
            className="h-9 w-9 rounded-xl object-cover border border-border"
            onError={(e) => {
              e.currentTarget.src = DEFAULT_AVATAR;
            }}
          />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-foreground">
              {name}
            </div>
            <div className="truncate text-xs text-muted-foreground">
              {params.row.email || "—"}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 260,
    renderCell: (params) => (
      <span className="text-sm text-foreground">{params.row.email || "—"}</span>
    ),
  },
  {
    field: "role",
    headerName: "Role",
    width: 160,
    renderCell: (params) => (
      <div
        className={[
          "inline-flex items-center justify-center",
          "rounded-full border px-3 py-1 text-xs font-semibold capitalize",
          rolePill(params.row.role),
        ].join(" ")}
      >
        {params.row.role || "—"}
      </div>
    ),
  },
];