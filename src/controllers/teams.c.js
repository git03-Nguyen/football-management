
function getTeams() {
  return [
    // 8 teams for testing, have same teamId=1, another fields are different
    {
      teamId: 1,
      name: "Manchester United",
      level: "Trung cấp",
      description: "Đội bóng của Sir Alex",
      members: ["Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái"],
      nOfMembers: 5,
      contactName: "Mr. Alex",
      contactPhone: "0123456789",
      contactEmail: "mailmail@gmail.com",
      managerId: 2,
      hasUniform: true,
    },
    {
      teamId: 2,
      name: "Manchester United",
      level: "Trung cấp",
      description: "Đội bóng của Sir Alex",
      members: ["Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái"],
      nOfMembers: 5,
      contactName: "Mr. Alex",
      contactPhone: "0123456789",
      contactEmail: "mailmail@gmail.com",
      managerId: 1,
    },
    {
      teamId: 2,
      name: "Manchester United",
      level: "Trung cấp",
      description: "Đội bóng của Sir Alex",
      members: ["Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái"],
      nOfMembers: 5,
      contactName: "Mr. Alex",
      contactPhone: "0123456789",
      contactEmail: "mailmail@gmail.com",
      managerId: 1,
    },
    {
      teamId: 2,
      name: "Manchester United",
      level: "Trung cấp",
      description: "Đội bóng của Sir Alex",
      members: ["Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái"],
      nOfMembers: 5,
      contactName: "Mr. Alex",
      contactPhone: "0123456789",
      contactEmail: "mailmail@gmail.com",
      managerId: 1,
    },
    {
      teamId: 2,
      name: "Manchester United",
      level: "Trung cấp",
      description: "Đội bóng của Sir Alex",
      members: ["Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái"],
      nOfMembers: 5,
      contactName: "Mr. Alex",
      contactPhone: "0123456789",
      contactEmail: "mailmail@gmail.com",
      managerId: 1,
    },
    {
      teamId: 2,
      name: "Manchester United",
      level: "Trung cấp",
      description: "Đội bóng của Sir Alex",
      members: ["Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái"],
      nOfMembers: 5,
      contactName: "Mr. Alex",
      contactPhone: "0123456789",
      contactEmail: "mailmail@gmail.com",
      managerId: 1,
    },
    {
      teamId: 2,
      name: "Manchester United",
      level: "Trung cấp",
      description: "Đội bóng của Sir Alex",
      members: ["Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái", "Nguyễn Tiến Thái"],
      nOfMembers: 5,
      contactName: "Mr. Alex",
      contactPhone: "0123456789",
      contactEmail: "mailmail@gmail.com",
      managerId: 1,
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

  // GET /teams/:teamId
  getTeam: function (req, res, next) {
    const user = req.isAuthenticated() ? req.user : null;
    const teamId = req.params.teamId;
    const team = getTeams().find(team => team.teamId == teamId);
    if (!team) return next();
    res.render('teams/team-info', {
      title: team.name,
      useTransHeader: true,
      subNavigation: 0,
      user: user,
      team: team,
    });
  },

  // GET /teams/:teamId/members
  getTeamMembers: function (req, res, next) {
    const user = req.isAuthenticated() ? req.user : null;
    const teamId = req.params.teamId;
    const team = getTeams().find(team => team.teamId == teamId);
    if (!team) return next();
    res.render('teams/team-members', {
      title: team.name,
      useTransHeader: true,
      subNavigation: 1,
      user: user,
      team: team,
    });
  },

  // GET /teams/:teamId/edit
  getEditTeam: function (req, res, next) {
    const user = req.isAuthenticated() ? req.user : null;
    const teamId = req.params.teamId;
    const team = getTeams().find(team => team.teamId == teamId);
    if (!team) return next();
    res.render('teams/team-edit', {
      title: team.name,
      useTransHeader: true,
      subNavigation: 3,
      subSubNavigation: 0,
      user: user,
      team: team,
    });
  },

  // GET /teams/:teamId/edit/members
  getEditTeamMembers: function (req, res, next) {
    const user = req.isAuthenticated() ? req.user : null;
    const teamId = req.params.teamId;
    const team = getTeams().find(team => team.teamId == teamId);
    if (!team) return next();
    res.render('teams/team-edit-members', {
      title: team.name,
      useTransHeader: true,
      subNavigation: 3,
      subSubNavigation: 1,
      user: user,
      team: team,
    });
  },

  // GET /teams/create
  getCreateTeam: function (req, res, next) {
    const user = req.isAuthenticated() ? req.user : null;
    res.render('teams/team-create', {
      title: "Tạo đội bóng",
      useTransHeader: true,
      user: user,
    });
  },

}