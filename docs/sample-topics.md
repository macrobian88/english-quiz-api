# Sample Topics - Curl Commands

## 1. Introductions

```bash
curl -X POST http://localhost:3000/api/admin/topics \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-admin-api-key" \
  -d '{
    "topic_id": "introductions",
    "title": "Introductions - How to Introduce Yourself",
    "files": [
      {
        "filename": "introductions-lesson.vtt",
        "content": "WEBVTT\n\n00:00:00.000 --> 00:00:05.000\nWelcome to our lesson on introductions. Today we will learn how to introduce ourselves in English.\n\n00:00:05.000 --> 00:00:12.000\nWhen you meet someone for the first time, you can say: My name is... For example: My name is John.\n\n00:00:12.000 --> 00:00:20.000\nAnother way to introduce yourself is: I am... For example: I am Sarah. Or the short form: I'\''m Sarah.\n\n00:00:20.000 --> 00:00:28.000\nYou can also ask someone their name by saying: What is your name? Or more casually: What'\''s your name?\n\n00:00:28.000 --> 00:00:35.000\nWhen someone tells you their name, you can respond: Nice to meet you. Or: Pleased to meet you.\n\n00:00:35.000 --> 00:00:42.000\nThe other person usually replies: Nice to meet you too. This shows politeness and friendliness.\n\n00:00:42.000 --> 00:00:50.000\nYou can also introduce yourself by saying where you are from: I am from India. I am from the United States.\n\n00:00:50.000 --> 00:00:58.000\nTo ask where someone is from, say: Where are you from? They will answer: I am from followed by their country or city.\n\n00:00:58.000 --> 00:01:05.000\nAnother useful phrase is: How do you do? This is a formal greeting used when meeting someone for the first time.\n\n00:01:05.000 --> 00:01:12.000\nThe correct response to How do you do is simply: How do you do? It is not a question about your health.\n\n00:01:12.000 --> 00:01:20.000\nLet us practice a simple introduction dialogue. Person A says: Hello, my name is David. What'\''s your name?\n\n00:01:20.000 --> 00:01:28.000\nPerson B responds: Hi David, I'\''m Maria. Nice to meet you. Person A replies: Nice to meet you too, Maria.\n\n00:01:28.000 --> 00:01:35.000\nYou can add more information about yourself: I am a teacher. I am a student. I am a doctor.\n\n00:01:35.000 --> 00:01:42.000\nTo ask about someone'\''s job, say: What do you do? Or: What is your job? Or: What is your occupation?\n\n00:01:42.000 --> 00:01:50.000\nRemember to smile and make eye contact when introducing yourself. This shows confidence and friendliness.\n\n00:01:50.000 --> 00:02:00.000\nPractice these phrases every day. The more you practice, the more natural your introductions will become."
      }
    ],
    "metadata": {
      "difficulty": "beginner",
      "duration": "02:00",
      "tags": ["introductions", "greetings", "basic english", "conversation"]
    }
  }'
```

## 2. Learn to Say Hello

```bash
curl -X POST http://localhost:3000/api/admin/topics \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-admin-api-key" \
  -d '{
    "topic_id": "say-hello",
    "title": "Learn to Say Hello",
    "files": [
      {
        "filename": "say-hello-lesson.vtt",
        "content": "WEBVTT\n\n00:00:00.000 --> 00:00:06.000\nToday we will learn different ways to say hello in English. This is one of the most important things to learn.\n\n00:00:06.000 --> 00:00:12.000\nThe most common greeting is simply: Hello. You can use hello in any situation, formal or informal.\n\n00:00:12.000 --> 00:00:18.000\nA shorter and more casual way to greet someone is: Hi. Hi is used with friends and people you know well.\n\n00:00:18.000 --> 00:00:25.000\nAnother casual greeting is: Hey. Hey is very informal and used mainly with close friends. Hey, how are you?\n\n00:00:25.000 --> 00:00:32.000\nWhen you greet someone, you often ask: How are you? This is a polite way to show you care about the person.\n\n00:00:32.000 --> 00:00:40.000\nCommon responses to How are you include: I am fine, thank you. I am good. I am doing well. I am great.\n\n00:00:40.000 --> 00:00:48.000\nAfter answering, it is polite to ask back: And you? Or: How about you? Or: What about you?\n\n00:00:48.000 --> 00:00:55.000\nInformal ways to ask how someone is: How'\''s it going? What'\''s up? How are things? How have you been?\n\n00:00:55.000 --> 00:01:02.000\nTo What'\''s up, you can respond: Not much. Nothing much. Just the usual. Or tell them what you are doing.\n\n00:01:02.000 --> 00:01:10.000\nIn British English, you might hear: Alright? This means Hello, how are you? You can respond: Yeah, alright. You?\n\n00:01:10.000 --> 00:01:18.000\nWhen answering the phone, you say: Hello? With a rising tone to show it is a question. Hello, this is John speaking.\n\n00:01:18.000 --> 00:01:25.000\nIn formal situations like business meetings, you might say: Good to see you. Or: It'\''s a pleasure to see you.\n\n00:01:25.000 --> 00:01:32.000\nWhen you haven'\''t seen someone for a long time, say: Long time no see! Or: It'\''s been a while!\n\n00:01:32.000 --> 00:01:40.000\nLet us practice. When you see your friend, say: Hi! How'\''s it going? Your friend might say: Hey! I'\''m good, thanks.\n\n00:01:40.000 --> 00:01:48.000\nRemember, the way you say hello depends on who you are talking to and the situation. Practice makes perfect!"
      }
    ],
    "metadata": {
      "difficulty": "beginner",
      "duration": "01:48",
      "tags": ["hello", "greetings", "basic english", "conversation"]
    }
  }'
```

## 3. Greetings for Different Times of Day

```bash
curl -X POST http://localhost:3000/api/admin/topics \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-admin-api-key" \
  -d '{
    "topic_id": "time-greetings",
    "title": "Greetings for Different Times of the Day",
    "files": [
      {
        "filename": "time-greetings-lesson.vtt",
        "content": "WEBVTT\n\n00:00:00.000 --> 00:00:07.000\nIn English, we use different greetings depending on the time of day. Let us learn these important phrases.\n\n00:00:07.000 --> 00:00:15.000\nIn the morning, from sunrise until 12 noon, we say: Good morning. For example: Good morning, how are you today?\n\n00:00:15.000 --> 00:00:23.000\nGood morning is used when you wake up, when you arrive at work, or when you meet someone before noon.\n\n00:00:23.000 --> 00:00:30.000\nIn the afternoon, from 12 noon until about 5 or 6 PM, we say: Good afternoon. Good afternoon, everyone.\n\n00:00:30.000 --> 00:00:38.000\nGood afternoon is slightly more formal than good morning. It is commonly used in business settings and formal situations.\n\n00:00:38.000 --> 00:00:45.000\nIn the evening, from about 5 or 6 PM until bedtime, we say: Good evening. Good evening, ladies and gentlemen.\n\n00:00:45.000 --> 00:00:52.000\nGood evening is a greeting, not a farewell. It is used when you meet someone in the evening hours.\n\n00:00:52.000 --> 00:01:00.000\nWhen someone is going to sleep, we say: Good night. Good night is a farewell, not a greeting. Sleep well. Good night!\n\n00:01:00.000 --> 00:01:08.000\nYou can also say: Sweet dreams. Or: Sleep tight. These are friendly ways to wish someone a good sleep.\n\n00:01:08.000 --> 00:01:15.000\nA common mistake is using Good night as a greeting. Remember: Good night means goodbye at night time.\n\n00:01:15.000 --> 00:01:22.000\nLet us review: Morning greeting is Good morning. Afternoon greeting is Good afternoon. Evening greeting is Good evening.\n\n00:01:22.000 --> 00:01:30.000\nGood night is only used when saying goodbye at night or when someone is going to bed. It is not a greeting.\n\n00:01:30.000 --> 00:01:38.000\nYou can shorten these greetings with friends: Morning! Afternoon! Evening! These are casual and friendly.\n\n00:01:38.000 --> 00:01:45.000\nIn emails, you can write: Good morning John, or just Hello John, or Dear John for formal emails.\n\n00:01:45.000 --> 00:01:52.000\nPractice using the right greeting for the right time. It shows respect and good manners in English culture.\n\n00:01:52.000 --> 00:02:00.000\nQuick quiz: If it is 3 PM, what do you say? Good afternoon! If it is 9 AM? Good morning! Well done!"
      }
    ],
    "metadata": {
      "difficulty": "beginner",
      "duration": "02:00",
      "tags": ["greetings", "time", "morning", "afternoon", "evening", "basic english"]
    }
  }'
```

## 4. Learn How to Spell in English

```bash
curl -X POST http://localhost:3000/api/admin/topics \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-admin-api-key" \
  -d '{
    "topic_id": "spelling-english",
    "title": "Learn How to Spell in English",
    "files": [
      {
        "filename": "spelling-lesson.vtt",
        "content": "WEBVTT\n\n00:00:00.000 --> 00:00:07.000\nToday we will learn about spelling in English. Knowing how to spell your name and words is very important.\n\n00:00:07.000 --> 00:00:15.000\nFirst, let us learn the English alphabet. There are 26 letters: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z.\n\n00:00:15.000 --> 00:00:22.000\nThe vowels are: A E I O U. The rest of the letters are consonants. Vowels are very important for pronunciation.\n\n00:00:22.000 --> 00:00:30.000\nLet us practice the alphabet sounds: A as in apple, B as in boy, C as in cat, D as in dog, E as in elephant.\n\n00:00:30.000 --> 00:00:38.000\nF as in fish, G as in girl, H as in house, I as in ice cream, J as in juice, K as in kite, L as in lion.\n\n00:00:38.000 --> 00:00:45.000\nM as in mother, N as in nose, O as in orange, P as in pen, Q as in queen, R as in rabbit, S as in sun.\n\n00:00:45.000 --> 00:00:52.000\nT as in tree, U as in umbrella, V as in van, W as in water, X as in box, Y as in yellow, Z as in zebra.\n\n00:00:52.000 --> 00:01:00.000\nWhen someone asks you to spell a word, you say each letter separately. How do you spell your name? M-A-R-Y. Mary.\n\n00:01:00.000 --> 00:01:08.000\nTo ask for spelling, say: How do you spell that? Or: Can you spell that for me? Or: Could you spell your name please?\n\n00:01:08.000 --> 00:01:15.000\nWhen spelling on the phone, use the NATO phonetic alphabet for clarity: A for Alpha, B for Bravo, C for Charlie.\n\n00:01:15.000 --> 00:01:22.000\nOr use simple words: A for Apple, B for Boy, C for Cat. This helps avoid confusion between similar sounding letters.\n\n00:01:22.000 --> 00:01:30.000\nLetters that sound similar: B and P, D and T, M and N, F and S. Be clear when spelling these letters.\n\n00:01:30.000 --> 00:01:38.000\nDouble letters: When a letter repeats, say double. For example, BOOK is spelled B-double O-K. HAPPY is H-A-double P-Y.\n\n00:01:38.000 --> 00:01:45.000\nPractice spelling common words: Hello is H-E-L-L-O. Thank you is T-H-A-N-K Y-O-U. Please is P-L-E-A-S-E.\n\n00:01:45.000 --> 00:01:52.000\nPractice spelling your name, your city, and your email address. These are things you will need to spell often.\n\n00:01:52.000 --> 00:02:00.000\nRemember to speak slowly and clearly when spelling. Practice the alphabet every day until you know it perfectly."
      }
    ],
    "metadata": {
      "difficulty": "beginner",
      "duration": "02:00",
      "tags": ["spelling", "alphabet", "letters", "basic english"]
    }
  }'
```

## 5. Learn About Different Jobs

```bash
curl -X POST http://localhost:3000/api/admin/topics \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-admin-api-key" \
  -d '{
    "topic_id": "different-jobs",
    "title": "Learn About Different Jobs and Occupations",
    "files": [
      {
        "filename": "jobs-lesson.vtt",
        "content": "WEBVTT\n\n00:00:00.000 --> 00:00:07.000\nToday we will learn about different jobs and occupations in English. This is useful vocabulary for everyday conversations.\n\n00:00:07.000 --> 00:00:15.000\nTo ask about someone'\''s job, you can say: What do you do? What is your job? What is your occupation? What do you do for a living?\n\n00:00:15.000 --> 00:00:22.000\nTo answer, you say: I am a... followed by your job. For example: I am a teacher. I am an engineer. I am a doctor.\n\n00:00:22.000 --> 00:00:30.000\nNotice we use a before consonant sounds: a teacher, a doctor, a nurse. We use an before vowel sounds: an engineer, an artist.\n\n00:00:30.000 --> 00:00:38.000\nLet us learn jobs in healthcare: A doctor treats sick people. A nurse helps doctors and cares for patients. A dentist takes care of teeth.\n\n00:00:38.000 --> 00:00:45.000\nA pharmacist prepares and sells medicine. A surgeon performs operations. A paramedic provides emergency medical care.\n\n00:00:45.000 --> 00:00:52.000\nJobs in education: A teacher teaches students in school. A professor teaches at a university. A principal manages a school.\n\n00:00:52.000 --> 00:01:00.000\nJobs in business: A manager manages a team or department. An accountant handles money and finances. A secretary handles office work.\n\n00:01:00.000 --> 00:01:08.000\nA businessman or businesswoman works in business. A salesperson sells products. A receptionist welcomes visitors and answers phones.\n\n00:01:08.000 --> 00:01:15.000\nJobs in technology: A programmer writes computer code. An engineer designs and builds things. A scientist does research.\n\n00:01:15.000 --> 00:01:22.000\nJobs in services: A chef cooks food in a restaurant. A waiter or waitress serves food. A hairdresser cuts and styles hair.\n\n00:01:22.000 --> 00:01:30.000\nA police officer protects people and enforces laws. A firefighter puts out fires. A lawyer provides legal advice.\n\n00:01:30.000 --> 00:01:38.000\nJobs in transportation: A pilot flies airplanes. A driver drives vehicles. A mechanic repairs cars and machines.\n\n00:01:38.000 --> 00:01:45.000\nJobs in construction: A builder builds houses. An electrician works with electrical systems. A plumber fixes pipes and water systems.\n\n00:01:45.000 --> 00:01:52.000\nCreative jobs: An artist creates art. A musician plays music. A writer writes books or articles. An actor performs in movies or theater.\n\n00:01:52.000 --> 00:02:00.000\nTo describe where you work, say: I work at a hospital. I work in an office. I work for a company. I work from home.\n\n00:02:00.000 --> 00:02:08.000\nPractice conversation: What do you do? I am a software engineer. I work for a technology company. That sounds interesting!\n\n00:02:08.000 --> 00:02:15.000\nRemember to learn the jobs that are relevant to you and practice using them in sentences. What do you do?"
      }
    ],
    "metadata": {
      "difficulty": "beginner",
      "duration": "02:15",
      "tags": ["jobs", "occupations", "professions", "vocabulary", "work"]
    }
  }'
```

## Bulk Upload All Topics at Once

```bash
curl -X POST http://localhost:3000/api/admin/topics/bulk \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-admin-api-key" \
  -d '{
    "topics": [
      {
        "topic_id": "introductions",
        "title": "Introductions - How to Introduce Yourself",
        "files": [{"filename": "introductions.vtt", "content": "WEBVTT\n\n00:00:00.000 --> 00:00:05.000\nWelcome to our lesson on introductions. Today we will learn how to introduce ourselves in English.\n\n00:00:05.000 --> 00:00:12.000\nWhen you meet someone for the first time, you can say: My name is... For example: My name is John.\n\n00:00:12.000 --> 00:00:20.000\nAnother way to introduce yourself is: I am... For example: I am Sarah. Or the short form: I am Sarah.\n\n00:00:20.000 --> 00:00:28.000\nYou can also ask someone their name by saying: What is your name? Or more casually: What is your name?\n\n00:00:28.000 --> 00:00:35.000\nWhen someone tells you their name, you can respond: Nice to meet you. Or: Pleased to meet you.\n\n00:00:35.000 --> 00:00:42.000\nThe other person usually replies: Nice to meet you too. This shows politeness and friendliness.\n\n00:00:42.000 --> 00:00:50.000\nYou can also introduce yourself by saying where you are from: I am from India. I am from the United States."}],
        "metadata": {"difficulty": "beginner", "tags": ["introductions", "greetings"]}
      },
      {
        "topic_id": "say-hello",
        "title": "Learn to Say Hello",
        "files": [{"filename": "hello.vtt", "content": "WEBVTT\n\n00:00:00.000 --> 00:00:06.000\nToday we will learn different ways to say hello in English. This is one of the most important things to learn.\n\n00:00:06.000 --> 00:00:12.000\nThe most common greeting is simply: Hello. You can use hello in any situation, formal or informal.\n\n00:00:12.000 --> 00:00:18.000\nA shorter and more casual way to greet someone is: Hi. Hi is used with friends and people you know well.\n\n00:00:18.000 --> 00:00:25.000\nAnother casual greeting is: Hey. Hey is very informal and used mainly with close friends.\n\n00:00:25.000 --> 00:00:32.000\nWhen you greet someone, you often ask: How are you? This is a polite way to show you care about the person.\n\n00:00:32.000 --> 00:00:40.000\nCommon responses to How are you include: I am fine thank you. I am good. I am doing well. I am great."}],
        "metadata": {"difficulty": "beginner", "tags": ["hello", "greetings"]}
      },
      {
        "topic_id": "time-greetings",
        "title": "Greetings for Different Times of the Day",
        "files": [{"filename": "time-greetings.vtt", "content": "WEBVTT\n\n00:00:00.000 --> 00:00:07.000\nIn English, we use different greetings depending on the time of day. Let us learn these important phrases.\n\n00:00:07.000 --> 00:00:15.000\nIn the morning, from sunrise until 12 noon, we say: Good morning. For example: Good morning, how are you today?\n\n00:00:15.000 --> 00:00:23.000\nIn the afternoon, from 12 noon until about 5 or 6 PM, we say: Good afternoon.\n\n00:00:23.000 --> 00:00:30.000\nIn the evening, from about 5 or 6 PM until bedtime, we say: Good evening.\n\n00:00:30.000 --> 00:00:38.000\nWhen someone is going to sleep, we say: Good night. Good night is a farewell, not a greeting.\n\n00:00:38.000 --> 00:00:45.000\nRemember: Good night means goodbye at night time. It is not used as a greeting like good morning or good evening."}],
        "metadata": {"difficulty": "beginner", "tags": ["greetings", "time of day"]}
      },
      {
        "topic_id": "spelling-english",
        "title": "Learn How to Spell in English",
        "files": [{"filename": "spelling.vtt", "content": "WEBVTT\n\n00:00:00.000 --> 00:00:07.000\nToday we will learn about spelling in English. Knowing how to spell your name and words is very important.\n\n00:00:07.000 --> 00:00:15.000\nThe English alphabet has 26 letters: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z.\n\n00:00:15.000 --> 00:00:22.000\nThe vowels are: A E I O U. The rest of the letters are consonants.\n\n00:00:22.000 --> 00:00:30.000\nWhen someone asks you to spell a word, you say each letter separately. How do you spell your name? M-A-R-Y.\n\n00:00:30.000 --> 00:00:38.000\nTo ask for spelling, say: How do you spell that? Can you spell that for me? Could you spell your name please?\n\n00:00:38.000 --> 00:00:45.000\nDouble letters: When a letter repeats, say double. BOOK is spelled B-double O-K. HAPPY is H-A-double P-Y."}],
        "metadata": {"difficulty": "beginner", "tags": ["spelling", "alphabet"]}
      },
      {
        "topic_id": "different-jobs",
        "title": "Learn About Different Jobs and Occupations",
        "files": [{"filename": "jobs.vtt", "content": "WEBVTT\n\n00:00:00.000 --> 00:00:07.000\nToday we will learn about different jobs and occupations in English.\n\n00:00:07.000 --> 00:00:15.000\nTo ask about someone job, say: What do you do? What is your job? What do you do for a living?\n\n00:00:15.000 --> 00:00:22.000\nTo answer, say: I am a teacher. I am an engineer. I am a doctor. Use a before consonants and an before vowels.\n\n00:00:22.000 --> 00:00:30.000\nHealthcare jobs: doctor, nurse, dentist, pharmacist, surgeon. A doctor treats sick people. A nurse helps patients.\n\n00:00:30.000 --> 00:00:38.000\nEducation jobs: teacher, professor, principal. A teacher teaches students. A professor teaches at university.\n\n00:00:38.000 --> 00:00:45.000\nBusiness jobs: manager, accountant, secretary, salesperson. A manager manages a team. An accountant handles money.\n\n00:00:45.000 --> 00:00:52.000\nOther jobs: chef, police officer, firefighter, pilot, engineer, lawyer, artist, musician, writer."}],
        "metadata": {"difficulty": "beginner", "tags": ["jobs", "occupations", "vocabulary"]}
      }
    ]
  }'
```
