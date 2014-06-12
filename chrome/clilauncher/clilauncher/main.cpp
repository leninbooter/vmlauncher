/*
 Arguments will be in the format:
                                    vmlaunch:mstsc:ip
                                    vmlaunch:vnc:ip
                                    vmlaunch:ssh:ip

*/

#include <QtCore/QCoreApplication>
#include <QStringList>
#include <QProcess>
#include <iostream>
#include <stdlib.h>

int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);

    QString args, client, host;
    QStringList argsList;

    if(a.arguments().count() < 2)
    {
        std::cout << "This application must receive a paremeter in the form of \"vmlaunche:mstsc:255.255.255.255\"" << std::endl;
        system("pause");
        return 0;
    }

    args = a.arguments().at(1).toLocal8Bit().constData();
    argsList = args.split(":");
    client = argsList[1];
    host = argsList[2];

    /*std::cout << "client: " << client.toAscii().data() << std::endl;
    std::cout << "host: " << host.toAscii().data() << std::endl;*/

    if ( client == "mstsc" )
    {
        QProcess *process = new QProcess();
        process->start("mstsc -v:" + host );
    }else
    {
        if ( client == "vnc" )
        {
            QProcess *process = new QProcess();
            process->start("vnc " + host + ":1");
        }else
        {
           if ( client == "ssh" )
           {
               QProcess *process = new QProcess();
               process->start("putty " + host);
           }
        }

    }
    return 0;
    return a.exec();
}
