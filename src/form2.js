
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());



mongoose.connect('mongodb+srv://dbGautum:Kamlesh@cluster0.entrtz5.mongodb.net/mongo?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    Password: {
      type: String,
      required: true
    }

    
});

const Student = mongoose.model('Student', studentSchema);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/students', (req, res) => {
    const student = new Student(req.body);
    student.save()
        .then(() => {
            res.send('Student added successfully');
        })
        .catch(err => {
            res.status(400).send('Unable to save student to database');
        });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});