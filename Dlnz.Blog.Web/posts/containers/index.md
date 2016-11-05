# Docker, Containers, Windows Server Containers

Unfortunately the Docker client does not work on Bash on Ubuntu on Windows (something to do with Unix pipes), let alone the Docker
engine. It's quicker and easier to install Docker for Windows. On Windows 10 or Windows Server this uses Hyper-V (not Virtual Box)
and is a seamless experience.

> Install Docker for Windows : <https://docs.docker.com/docker-for-windows/>

> Hello world for .NET Core on Debian in a container : <https://medium.com/trafi-tech-beat/running-net-core-on-docker-c438889eb5a#.w72qh8qkg>

> Dockerizing a Node.js web app : <https://nodejs.org/en/docs/guides/nodejs-docker-webapp/>

> Visual Studio Tools for Docker - Preview: <https://visualstudiogallery.msdn.microsoft.com/0f5b2caa-ea00-41c8-b8a2-058c7da0b3e4>

## Windows Server 2016

Welcome home Docker. Follow these instructions to install Docker CLI on Windows Server 2016:

> ARM Template for Windows 2016 TP5 with Containers: <https://azure.microsoft.com/en-us/documentation/templates/windows-server-containers-preview/>

> Docker Engine on Windows: <https://msdn.microsoft.com/en-us/virtualization/windowscontainers/docker/configure_docker_daemon>

And then get an IIS container running!

> (Quick start) Container Images on Windows Server: <https://msdn.microsoft.com/virtualization/windowscontainers/quick_start/quick_start_images>

> Windows Containers Documentation: <https://msdn.microsoft.com/virtualization/windowscontainers/containers_welcome>

> `microsoft/dotnet` on Docker: <https://hub.docker.com/r/microsoft/dotnet/>

> Good example of ASP.NET 4.x in a Windows Server container: <https://github.com/anthonychu/aspnet-4.x-docker-windows-container>

### Windows Server Containers - Quick-start

> Theres is a really good article on this here: <https://msdn.microsoft.com/virtualization/windowscontainers/quick_start/quick_start_images>

On Windows Server 2016 with Containers:

```docker
docker pull microsoft/nanoserver
docker images
docker run --help
docker run microsoft/nanoserver -it powershell    #run and leave an interactive powershell prompt running

#write a dockerfile (see below), then...

docker build .

#when that succeeds

docker ps    #to read the container name

docker commit (name) (new-image-name)

#then register for a Docker Hub account and
docker push
```


#### Sample Dockerfile



```dockerfile
FROM microsoft/iis

RUN powershell add-windowsfeature web-asp-net45

RUN powershell remove-item C:\inetpub\wwwroot\iisstart.*

# Copy files
RUN md c:\build
WORKDIR c:/build
COPY . c:/build

RUN xcopy c:\build\xcopydeploy c:\inetpub\wwwroot /s

ENTRYPOINT powershell
```

### XCopy Deploy

(Last time I checked) MSIEXEC won't run in a Windows Server Core container which means
you can't install MSDEPLOY. As much as I love MSDEPLOY, I'm not sure it makes sense in
a container. Let's Publish to a Folder and XCOPY instead.

To get MSBUILD to publish to disk you need to add the following target just below the 
last `<Import>` element:

```xml
<Target Name="PublishToFileSystem" DependsOnTargets="PipelinePreDeployCopyAllFilesToOneFolder">
<Error Condition="'$(PublishDestination)'==''" Text="The PublishDestination property must be set to the intended publishing destination." />
<MakeDir Condition="!Exists($(PublishDestination))" Directories="$(PublishDestination)" />
<ItemGroup>
    <PublishFiles Include="$(_PackageTempDir)\**\*.*" />
</ItemGroup>
<Copy SourceFiles="@(PublishFiles)" DestinationFiles="@(PublishFiles->'$(PublishDestination)\%(RecursiveDir)%(Filename)%(Extension)')" SkipUnchangedFiles="True" />
</Target>
```

Then the MSBUILD command is something like:

```dos
msbuild /p:PublishDestination=.\XCopyDeploy /t:PublishToFileSystem
```

> Locally publishing a VS2010 ASP.NET web application using MSBuild: <http://www.digitallycreated.net/Blog/59/locally-publishing-a-vs2010-asp.net-web-application-using-msbuild>

### Injecting configuration into a Windows Server Container

A good summary from Linux containers:

> How Should I Get Application Configuration into my Docker Containers?: <https://dantehranian.wordpress.com/2015/03/25/how-should-i-get-application-configuration-into-my-docker-containers/>

I went with Environment Vars, using my [Scale.LocalSettings] library.

[Scale.LocalSettings]: https://github.com/FeatherAndScale/LocalSettings

### Remote Docker is hard on Windows Server

Need to create and install SSL certs. The only instructions I can find use openssl. This process should be
ported to PowerShell. In the meantime I have installed a VSTS Build Agent on the Windows Server 2016 w/ Containers box. 
However, using the PowerShell Containers API may be better and easier.

### You have to do this to get `docker push` working :\

> docker unauthorized: authentication required - upon push with successful login: <http://stackoverflow.com/a/36664163>
