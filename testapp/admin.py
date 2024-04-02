from django.contrib import admin

from .models import User, Device, Var, Value, Note, Devmtcpserver, Mtcpclient, Registers
# Register your models here.
admin.site.register(User)
admin.site.register(Device)
admin.site.register(Var)
admin.site.register(Value)
admin.site.register(Note)
admin.site.register(Devmtcpserver)
admin.site.register(Mtcpclient)
admin.site.register(Registers)