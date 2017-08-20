
function SkillListController(Skill) {
  let ctrl = this;
  /*ctrl.list = [
    {
      skill: 'Javascript',
      experience: 'Proficient',
      img: '..',
      link: 'www.google.com'
    },
    {
      skill: 'Python',
      experience: 'Proficient',
      img: '..',
      link: 'www.google.com'
    },
    {
      skill: 'Java',
      experience: 'Proficient',
      img: '..',
      link: 'www.google.com'
    }
  ]
  */
  Skill.query({}, function(skills) {
    console.log(skills.skills)
    ctrl.list = skills.skills
    let len = ctrl.list.length
    let mid = len/2
    ctrl.left = ctrl.list.slice(0, mid)
    ctrl.right = ctrl.list.slice(mid, len)
    ctrl.current = ctrl.list[0]
  })
  ctrl.updateCurrent = function(skill) {
    ctrl.current = skill
  }
}

angular.
  module("skillsBlock").
  component("skillsList", {
    templateUrl: 'components/skills-block/skill-list.template.html',
    controller: ['Skill', SkillListController]

  })
