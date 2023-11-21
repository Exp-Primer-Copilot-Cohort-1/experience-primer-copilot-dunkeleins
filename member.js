function skillsMember() {
    var member = {
        name: 'John',
        age: 30,
        skills: ['JS', 'React', 'Node'],
        greet: function () {
            console.log('Hello');
        }
    };
    member.greet();
    member.skills.forEach(function (skill) {
        console.log(skill.toUpperCase());
    });
}