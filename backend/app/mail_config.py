from fastapi import BackgroundTasks
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from app.config import settings

conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=settings.MAIL_FROM,
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_FROM_NAME=settings.MAIL_FROM_NAME,
    MAIL_TLS=True,
    MAIL_SSL=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True,
    TEMPLATE_FOLDER='app/templates/'
)


# 가입 인증 메일
async def signup_mail(background_tasks: BackgroundTasks, email: str, token: str):
    try:
        message = MessageSchema(
            subject="[RECHEFI]회원가입 인증을 요청합니다.",
            recipients=[email],
            # 개발용 메시지
            # body=f'아래 링크를 클릭하여 인증을 완료해주세요.\nhttp://localhost:8000/members/{email}/{token}\n인증 링크의 유효시간은 5분입니다.',
            # 배포용 메시지
            # body=f'아래 링크를 클릭하여 인증을 완료해주세요.\nhttps://j7b303.p.ssafy.io/api/members/{email}/{token}\n인증 링크의 유효시간은 5분입니다.',
            template_body={'email': email, 'token': token}
            )
        fm = FastMail(conf)
        background_tasks.add_task(fm.send_message, message, template_name='email_template.html')
        return True
    except:
        return False


# 임시 비밀번호 발급 메일
async def password_mail(background_tasks: BackgroundTasks, email: str, password: str):
    try:
        message = MessageSchema(
            subject="[RECHEFI]임시 비밀번호를 발급하였습니다.",
            recipients=[email],
            # body=f'다음과 같이 회원님의 임시 비밀번호를 발급합니다.\n{password}\n 로그인 후 비밀번호를 꼭 변경해주세요.',
            template_body={'email': email, 'password': password}
            )
        fm = FastMail(conf)

        background_tasks.add_task(fm.send_message, message, template_name='email_password.html')

        return True
    except:
        return False