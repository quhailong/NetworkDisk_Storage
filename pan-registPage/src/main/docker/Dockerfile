FROM frolvlad/alpine-oraclejdk8:slim  
VOLUME /tmp  
ADD registpage2.jar app.jar  
RUN sh -c 'touch /app.jar'  
ENV JAVA_OPTS=""  
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app.jar" ] 