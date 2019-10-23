const Nexmo = require('nexmo');

const nexmo = new Nexmo({
    apiKey: '8b7a5600',
    apiSecret: 'nJlZDdRLKJX8mWs7',
});

module.exports = {
    async signup(req, res) {
        if (_.any(['name', 'email', 'password', 'mobile'], attr => !req.body[attr] || req.body[attr].trim().length === 0)) {
            return res.badRequest({ error: 'The provided fullName, password and/or email address are invalid.' });
        }
        try {
            let uEmail = req.body.email;
            await User.create({
                email: uEmail.toLowerCase(),
                password: req.body.password,
                name: req.body.name,
                mobile: req.body.mobile
            })
                .intercept('E_UNIQUE', 'emailAlreadyInUse');
            res.set("Access-Control-Allow-Origin", "*");
            return res.json(200);
        } catch (err) {
            console.log(err);
            return res.badRequest({ error: err.message }, null, err);
        }
    },
    async login(req, res) {
        try {
            let email = req.body.email;
            let Users = await User.findOne({
                email: email.toLowerCase()
            });
            res.set("Access-Control-Allow-Origin", "http://localhost:3000");
            res.set("Access-Control-Allow-Methods", "POST");
            if (Users.password == req.body.password) {
                return res.json(true);
            }
            return res.json(false);
        } catch (err) {
            console.log(err);
            return res.json(false);
        }
    },
    async otp(req, res) {
        let mobile = req.body.mobile;
        let users = await User.findOne({
            mobile: mobile
        });
        if (users!=undefined) {
            let digits = '0123456789';
            let OTP = '';
            for (let i = 0; i < 4; i++) {
                OTP += digits[Math.floor(Math.random() * 10)];
            }
            const from = 'Whitepanda';
            const to = '91' + users.mobile;
            const text = 'Your otp is' + OTP;
            await nexmo.message.sendSms(from, to, text);
            let otp = await Otp.findOne({
                mobile: users.mobile
            })
            if (otp) {
                await Otp.update({ mobile: users.mobile })
                    .set({
                        otp: OTP
                    });
            }
            else {
                await Otp.create({
                    mobile: mobile,
                    otp: OTP
                })
            }
            return res.json(true);
        }
        else {
            return res.json(false);
        }
    },
    async getotp(req, res) {
        let otps = await Otp.find({});
        console.log(otps);
        res.json(200);
    },
    async verifyOtp(req, res){
       console.log(req.body);
       let mobile= req.body.mobile;
       let otps =await Otp.findOne({
           mobile: mobile
       })
       if(otps.otp === req.body.otp){
          res.json(true);
       }
       else{
           res.json(false);
       }
    }  
}