
function getTeams() {
  return [
    // 8 teams for testing, have same teamId=1, another fields are different
    {
      teamId: 1,
      name: "Manchester United",
      level: "Trung cấp",
      description: "Đội bóng của Sir Alex",
      members: ["Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái"],
    },
    {
      teamId: 1,
      name: "Manchester United",
      level: "Trung cấp",
      description: "Đội bóng của Sir Alex Ferguson hahahaahahhahahaha",
      members: ["Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái"],
    },
    {
      teamId: 1,
      name: "Manchester United",
      level: "Trung cấp",
      description: "Đội bóng của Sir Alex",
      members: ["Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái"],
    },
    {
      teamId: 1,
      name: "Manchester United",
      level: "Trung cấp",
      description: "Đội bóng của Sir Alex",
      members: ["Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái"],
    },
    {
      teamId: 1,
      name: "Manchester United",
      level: "Trung cấp",
      description: "Đội bóng của Sir Alex",
      members: ["Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái"],
    },
    {
      teamId: 1,
      name: "Manchester United",
      level: "Trung cấp",
      description: "Đội bóng của Sir Alex",
      members: ["Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái"],
    },
    {
      teamId: 1,
      name: "Manchester United",
      level: "Trung cấp",
      description: "Đội bóng của Sir Alex",
      members: ["Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái"],
    },
    {
      teamId: 1,
      name: "Manchester United",
      level: "Trung cấp",
      description: "Đội bóng của Sir Alex",
      members: ["Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái"],
    },
    {
      teamId: 1,
      name: "Manchester United",
      level: "Trung cấp",
      description: "Đội bóng của Sir Alex",
      members: ["Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái"],
    },
    {
      teamId: 1,
      name: "Manchester United",
      level: "Trung cấp",
      description: "Đội bóng của Sir Alex",
      members: ["Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái"],
    },
    {
      teamId: 1,
      name: "Manchester United",
      level: "Trung cấp",
      description: "Đội bóng của Sir Alex",
      members: ["Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái"],
    },
    {
      teamId: 1,
      name: "Manchester United",
      level: "Trung cấp",
      description: "Đội bóng của Sir Alex",
      members: ["Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái"],
    },


  ];
}

module.exports = {

  // GET /teams
  getTeams: function (req, res, next) {
    const user = req.isAuthenticated() ? req.user : null;
    const page = req.query.page || 1;
    const nPerPage = 9;
    const nOfPages = Math.ceil(getTeams().length / nPerPage);
    const teams = getTeams().slice((page - 1) * nPerPage, page * nPerPage);
    if (page > nOfPages) return next();
    res.render('teams/teams', {
      title: "Tất cả đội bóng",
      useTransHeader: false,
      user: user,
      nOfPages: nOfPages,
      page: page,
      teams: teams,
    });
  },

}