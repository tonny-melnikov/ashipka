exports.home = {
  get: (req, res) => {
    const ops = {
        h1: 'Вы вошли на сайт!',
        title: 'Внутри сайта',
        description: 'Внутри сайта'
    };

    res.render('spot', ops );
  }
}

exports.doprobiv = {
  get: (req, res) => {
    const ops = {
        h1: 'Допробив',
        title: 'Допробив',
        description: 'Допробив',
        script: '/screeps/doprobiv.js'
    };

    res.render( 'vue', ops );
  }
}
