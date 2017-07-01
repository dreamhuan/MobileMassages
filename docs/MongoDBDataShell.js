//run: mongo localhost:27017/mobilemassages  --shell MongoDBDataShell.js
db.dropDatabase();
db.bookingstep.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef042"),
    "type": "Choose a session",
    "id": "chooseSessionMenu",
    "options": [
        "Single -1 therapist",
        "normal -2 therapists",
        "wonderful -3 therapists",
        "fantastic -4 therapists"
    ]
});

db.bookingstep.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef043"),
    "type": "Massage length",
    "id": "chooseLengthMenu",
    "options": [
        "60 minutes - £99",
        "90 minutes - £120",
        "120 minutes - £150",
        "180 minutes - £240"
    ]
});

db.bookingstep.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef044"),
    "type": "Massage type",
    "id": "chooseTypeMenu",
    "options": [
        "Swedish Massage",
        "Deep Tissue Massage",
        "Hot Stone Massage",
        "Ayurvedic Massage",
        "Thai Massage"
    ]
});

db.faq.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef045"),
    "title": "How does Mobile Massages work?",
    "content": "Mobile Massage allows you to order a five-star massage to your home.hotel,office,or event in as little as an hour.We match your massage request with a vetted certified massage therapist available in your area at the specified time.At your appointment time,a therapist will arrive at your door with massage table,fresh linens,lotions,oils,and music to ensure a relaxing massage.All you have to do is sit back,relax,and enjoy your massage."
});

db.faq.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef046"),
    "title": "What types of services are offered by Mobile Massages?",
    "content": "Mobile Massages currently offers deep tissue,Swedish,sports,and prenatal massages.Any of these modalities can be performed as a couples massage,either with two massage therapists performing simultaneous massage or one therapists performing massage one after another.Soothe also offers chair and table massage delivered to your office or event with Mobile Massages at Work and Mabila Massages Events."
});

db.faq.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef047"),
    "title": "How do I pick a therapist?",
    "content": "We will match you with the highest quality massage therapist available at the time specified.You have the option to choose a male or female therapist if you have a preference,but are not able to select the exact therapist that you'd like."
});

db.faq.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef048"),
    "title": "How does Mobile Massage vet the therapists in its network?",
    "content": "We're very careful about the massage therapists we select to join the Mobile Massage network.We interview all of our therapists in person and make sure they are fully licensed and insured in their state of practice.We accept only the highest quality therapists with a history of excellence in customrer satisfaction.In most states the process to become a certified massage therapist(CMT) requires applicants to successfully pass background checks conducted by a state investigator,before being deemed able to safely work with the public.All Mobile Massages therapists have passed these government sponsored certification measures.In order to become a CMT,a therapist must also complete a minumum of 500 hours of practical traning,but some states require as much as 1,000 hours.All Mobile Massages therapists have the highest level of Integrity and professionalism.In return,we expect all clients to reciprocate the same level of respect and conduct."
});

db.faq.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef049"),
    "title": "Can I rebook with the same therapist?",
    "content": "Yes,absolutely!After your first massage with a Mobile Massages massage therapist,you will be given the option to re-book with the same therapist.Keep in mind,however,we cannot guarantee that the same therapist will be available at the time you request."
});

db.faq.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef04a"),
    "title": "Can I book a massage directly with a therapist instead of through Mobile Massages?",
    "content": "Mobile Massage takes the stress out of booking a massage and is able to function because of the honor system.If you enjoy massages,we hope that you will do your part in keeping our eco-system intact.We strongly encourage our clients to use Mobile Massage exclusively for all of their massage needs."
});

db.faq.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef04b"),
    "title": "How much clothing should I remove?",
    "content": "Feel free to undress to your level of comfort.If you'd prefer to leave on undergarments,be our guest!If you feel more comfortable nude,you may undress completely and position your body under the sheet.Therapists are trained to properly drape your body to protect your modesty and theirs."
});

db.faq.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef04c"),
    "title": "What about parking?",
    "content": "When booking,we ask that you provide detailed parking information.If our therapist is unable to find free parking,or none is available in your area,you will be expected to reimburse the therapist for any parking costs incurred."
});

db.faq.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef04d"),
    "title": "What is Mobile Massage's cancellation policy?",
    "content": "You may cancel or reschedule your appointment up to 1 hour before the appointment time with no penalty<ul><li>If you reschedule with less than 1 hour's notice,you will be charged a $35/￡25 fee*</li><li>If you reschedule with less than 30 minutes'notice,you will be charged a $50/￡35 fee*</li><li>If you cancel with less than 1 hour's notice,you will be charged a $50/￡35 fee*</li><li>If you cancel with less than 30 minutes,you will be charged the full amount of the massage*</li><li>If a therapist has not yet been assigned to your appointment you will not be charged.</li></ul>"
});

db.faq.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef04e"),
    "title": "Does Mobile Massages accept insurance?",
    "content": "Mobile Massages does not accept insurance as a form of payment.However,somr insurance companies will allow clients to self-claim and file for reimbursement."
});

db.faq.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef04f"),
    "title": "Do I need my own massage table?",
    "content": "There's no need for your own massage table.Our therapists bring the massage table,clean sheets,oils,and music to create the full massage experience."
});

db.faq.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef050"),
    "title": "Do I need my own sheets for the massage table?",
    "content": "Mobile Massage therapists always come prepared with fresh linens,however you may use your own."
});

db.faq.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef051"),
    "title": "You're not in my city!Can I still get a Mobile Massage?",
    "content": "We're expanding each day!Check back in here to see if Mobile Massages has arrived in your city."
});

db.massagetype.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef052"),
    "img": "../img/home-massage-type-icons/Swedish.ico",
    "title": "Swedish",
    "content": "A gentle technique,with long strokes,kneading,and circular movements to relax and energize."
});

db.massagetype.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef053"),
    "img": "../img/home-massage-type-icons/Deep-tissue.svg",
    "title": "Deep tissue",
    "content": "Utilizes show,more forceful strokes to target deep muscle layers and connective tissue."
});

db.massagetype.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef054"),
    "img": "../img/home-massage-type-icons/Sports.svg",
    "title": "Sports",
    "content": "Targets muscle-tendon junctions to boost flexibility and endurance,while reducing muscle fatigue."
});

db.massagetype.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef055"),
    "img": "../img/home-massage-type-icons/Pre-natal.svg",
    "title": "Pre-natal",
    "content": "Lessens pregnancy discomfort,helping alleviate backaches,stiffness,leg cramps,headaches,and swelling."
});

db.massagetype.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef056"),
    "img": "../img/home-massage-type-icons/Couples-Massage.svg",
    "title": "Couples Massage",
    "content": "All modalities can be performed as couples massage.Order one therapist for back to back or two for simultaneous massage."
});

db.massagetype.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef057"),
    "img": "../img/home-massage-type-icons/Thai-Massage.svg",
    "title": "Thai Massage",
    "content": "It is an ancient healing sysytem that combines broad and targeted acupreesure,stimulation and manipulation of energy lines called sen,and assisted yoga postures."
});

db.massagetype.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef058"),
    "img": "../img/home-massage-type-icons/Relaxing.svg",
    "title": "Relaxing",
    "content": "Helps de-stress and loosen up your body and is great for those who have had a hard working week or feel like treating themselves to some TLC!"
});

db.massagetype.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef059"),
    "img": "../img/home-massage-type-icons/At-work.svg",
    "title": "At work",
    "content": "Decrease stress,improve productivity,and build employee morale with in-office chair massage."
});

db.price.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef05a"),
    "therapistNumber": 1.0,
    "priceList": [
        {
            "time": 60.0,
            "price": 65.0
        },
        {
            "time": 90.0,
            "price": 75.0
        },
        {
            "time": 120.0,
            "price": 95.0
        }
    ]
});

db.price.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef05b"),
    "therapistNumber": 2.0,
    "priceList": [
        {
            "time": 60.0,
            "price": 130.0
        },
        {
            "time": 90.0,
            "price": 150.0
        },
        {
            "time": 120.0,
            "price": 190.0
        }
    ]
});


db.therapist.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef05c"),
    "name": "Rose",
    "img": "../img/face/Rose.jpg",
    "intro": "Rose immediately puts you at ease with her cheerful smile,calm approach & friendly personality. With over 3 years  of experience from Latvia where she focused on both beauty and massage treatments, she is now massaging London better with us as she loves London and always enjoyed doing massages more than beauty treatments. When you just fancy melting away from the rest of the world for a blissful, no fuss, real pampering treat from head to toe, we recommend you book a session with Rose!!"
});

db.therapist.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef05d"),
    "name": "Susan",
    "img": "../img/face/Susan.jpg",
    "intro": "Susan has a deep passion for relaxing and rejuvenating people through her excellent massages. Her naturally warm, calm and flowing touch will unwind you into a state of bliss, or, if you wish, Susan can instead work firmer into your muscles for a more invigorating deeper session. Holistic massage is about the whole you, so enjoy her listening skills too - feel free to chat away during your session or remain totally silent if you prefer. Friendly, reliable, on time and a massage not to be missed ."
});

db.therapist.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef05e"),
    "name": "Anne",
    "img": "../img/face/Anne.jpg",
    "intro": "Anne loves massaging because seeing people feel better and happier after her treatment makes her smile. Using her warm hands, Anne will give you an massage which is both relaxing and also as strong as you like. She can apply extra deep pressure with long flowing forearm strokes which really get into your muscles. Emese has lots of energy and can happily do a really long treatment at full throttle without tiring out. For those of you who love a strong and active yet smooth and graceful massage, Anne the therapist to try!"
});

db.therapist.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef05f"),
    "name": "Piper",
    "img": "../img/face/Piper.jpg",
    "intro": "Hand over to Piper, a highly skilled therapist for a magnificent health treat. She combines several techniques to create a totally captivating & unique massage. Beginning with softer strokes to prepare and warm you, Piper then utilises intense deep tissue techniques to squeeze out and release toxins thus reviving your muscles. She continuously adjusts her massage to adapt to your body’s signals. To top it all off, Piper has a really lovely personality and creates a feeling of total calm from the start. Highly recommended if you want a deep and wonderful massage."
});

db.therapist.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef060"),
    "name": "Carol",
    "img": "../img/face/Carol.jpg",
    "intro": "Carol has a really lovely, calm and relaxed approach which immediately makes you comfortable. Combining two of the most popular international styles into one excellent treatment, Carol’s massage is both deep and relaxing at the same time. Reliable, dedicated and polite in manner, Carol serves up a truly excellent holistic massage. Her wish is to make her clients feel better and we are confident she will achieve that with your booking! Treat yourself to a totally soothing deep tissue massage today."
});

db.therapist.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef061"),
    "name": "Lisa",
    "img": "../img/face/Lisa.jpg",
    "intro": "Lisa warms your body with rhythmic, gradual, presses and applies fine oils to provide you with a luxurious, deep, holistic treatment personalised for you. You will enjoy warm, focused and confident touches starting from your legs and flowing naturally onto your other muscles throughout the massage. This technique achieves an excellent all-over body massage which deeply works and relaxes each muscle group individually whilst being seamless and smooth in nature. Treat yourself to a truly excellent mobile treatment and true bliss!"
});

db.therapist.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef062"),
    "name": "Josie",
    "img": "../img/face/Josie.jpg",
    "intro": "Our smiling therapist Josie has loads of experience having previously worked in a Hungarian massage spa for over 4 years. Josie has a very flowing style, starting with your feet and moving upwards. Initial softer strokes are designed to warm your muscles, and then deeper massage manipulation strokes flow expertly along your body, targeting tight spots directly for additional remedial relief. This is an excellent head to toe massage which is graceful and elegant allowing you to relax but also deep, thus easing tension, reducing stress and massaging you into better health!"
});

db.therapist.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef063"),
    "name": "Kate",
    "img": "../img/face/Kate.jpg",
    "intro": "Confident, experienced and cmiley! Kate qualified as a medical masseur in Hungary and worked in an excellent spa there. She is highly skilled and tops that off by having a true passion for massage. From relaxing to deeper deep and passive stretching, Kate is sure to have a style that will work wonders for you. Lie back and hand over total control for the ultimate in home visit massage."
});

db.therapist.insert({

    "_id": ObjectId("5957b4aa4ad27643ec9ef064"),
    "name": "Chloe",
    "img": "../img/face/Chloe.jpg",
    "intro": "Chloe is passionate about massage her specialist area is oil based Ayurvedic Yoga style treatments. Using a combination of oil massage techniques and yoga techniques, Chloewill balance your elements, improve circulation and release toxins. Deeply satisfying yoga and thai stretches are used to help mobilise your joints and release deep tension in your muscles. If you are brave and interested in a pure and deep massage with a real difference from the rest, this is one to try!"
});

db.therapist.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef065"),
    "name": "Alice",
    "img": "../img/face/Alice.jpg",
    "intro": "Highly skilled in a wide range of styles, your massage with Alice will commence with her calming nature and warming touch before progressing into deep, thorough strokes which flow expertly up and down your body. Prepare yourself for an intense feeling of tranquility and relaxation whilst also enjoying a really deep massage into each muscle group. Deep & relaxing to the extreme! Her passion for massage, nature and skills make Alice an excellent therapist."
});

db.therapist.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef066"),
    "name": "Maria",
    "img": "../img/face/Maria.jpg",
    "intro": "Maria loves seeing the immediate beneficial relief that deep tissue massage can bring to her clients aches and pains. In fact it was deep tissue massage which inspired Mariato become a massage therapist in the first place! She is also a firm believer that the best massages incorporate good energy and commitment and this is clear when you receive her treatment.Massage makes Maria feel better... even though she is doing the treatment... a wonderful philosophy!"
});

db.therapist.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef067"),
    "name": "Sam",
    "img": "../img/face/Sam.jpg",
    "intro": "Sam’s expertise in massage shows as soon as she starts your treatment. Her style is flowing in nature, with circular movements effortlessly mixed with deeply relaxing presses. Sam gradually moves her massage along your body, tracing each muscle group precisely and thoroughly. You will feel a deep and instant relaxation in each of these areas before she moves on. Both her hands work closely together in harmony, interweaving and applying deeper pressure exactly where you need it most."
});

db.therapist.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef068"),
    "name": "Lara",
    "img": "../img/face/Lara.jpg",
    "intro": "A charming and friendly personality coupled with a magnificent massage from warm Hungarian hands, Lara is sure to make your aches, pains and stresses seem like they were never even there! Melinda's sessions start with warm relaxing, flowing, touches of a classic Swedish style massage and then progress, if you wish, into a more intensive, deeper tissue treatment, but retain the lovely flowing nature throughout. Lara qualified in Hungary and really loves massaging people better all around London!"
});

db.therapist.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef069"),
    "name": "Tia",
    "img": "../img/face/Tia.jpg",
    "intro": "Tia is keen to ensure you enjoy the very best treatment she can provide, so puts her heart and full energy into every massage treatment. Whether you need deep, intense massage techniques to revive and refresh your muscles or prefer a more soothing and softer touch to relax, Tia is sure to please. Tia has a friendly and very calm personality, thus creating the perfect atmosphere for you to enjoy your massage. An excellent and very reliable therapist providing wonderful treatments!"
});

db.therapist.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef06a"),
    "name": "Sarah",
    "img": "../img/face/Sarah.jpg",
    "intro": "Warm hands and a caring personality, Sarah offers an excellent deep relaxation massage combining high-end classic and deep tissue techniques with long, flowing relaxation strokes. Sarah trained at a premium Hungarian spa and qualified as a medical masseuse before bringing her amazing massage to you in London. Her lovely calm personality and enthusiasm to be reliable and organised makes her stress-busting massage all that much better."
});

db.therapist.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef06b"),
    "name": "Penelope",
    "img": "../img/face/Penelope.jpg",
    "intro": "Take a deep breath, close your eyes, let Penelepo take complete control from her first touch. Lara is one of our most experienced therapists with a wide range of styles. From soft massages which send you to sleep, to intense deep tissue massages which revive you. Penelope is also happy to combine several techniques into one session. A happy, calm and friendly Hungarian personality with bags of skill, Lara has a magical ability to take you to Massage Heaven. You are in for a treat!"
});

db.therapist.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef06c"),
    "name": "Molly",
    "img": "../img/face/Molly.jpg",
    "intro": "After repeatedly hearing how wonderful her massage was from friends and family in Budapest, Molly moved to London and has started as a mobile massage therapist! She offers you a truly brilliant oil-based massage, working deeper into tight muscles whenever needed. Her passion for massage, calm personality and attentive caring nature ensure you will feel comfortable throughout your treatment and make her an excellent therapist. In her spare time, Piroska enjoys travelling, hiking and sports."
});

db.therapist.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef06d"),
    "name": "Clara",
    "img": "../img/face/Clara.jpg",
    "intro": "If you are looking for a really strong full-body massage, which is warm, slow and expertly delivered, then Clarais the therapist for you! Clara, who has over 5 years of experience, progresses calmly across the contours of your body, in skillful flowing strokes. Both hands work each muscle group thoroughly and slowly, applying pressure point techniques in any tight spots. A super relaxation or rejuvenation massage from an excellent and reliable therapist. Total body relaxation expertly delivered."
});

db.therapist.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef06e"),
    "name": "Kylie",
    "img": "../img/face/Kylie.jpg",
    "intro": "When we asked Kylie what she would have done if she had not become a masseuse she replied “Nothing else! I love massage!”. And it shows. A dedicated, experienced massage therapist who knows what she is doing and does it with real skill, style and understanding. Confident, calm and caring Bernadett is able to massage you from strong and deep to soft and relaxing. In over four years of mobile massage therapy,."
});

db.therapist.insert({
    "_id": ObjectId("5957b4aa4ad27643ec9ef06f"),
    "name": "Lauren",
    "img": "../img/face/Lauren.jpg",
    "intro": "Lauren believes no two people are the same and so a really good massage comes from feeling and reacting to the different requirements of each person and their various muscles. She has a very warm and engaging personality with a deep passion for massage. Being physiotherapy trained and with extensive experience of working in a military hospital, Lauren is very comfortable doing a really deep massage working right into your problematic areas, or if you prefer, she can of course do a softer relaxation massage melting away mental stresses."
});