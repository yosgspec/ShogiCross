# ビルドステージ
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["package.csproj", "."]
RUN dotnet restore "package.csproj"
COPY . .
WORKDIR "/src"
RUN dotnet build "package.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "package.csproj" -c Release -o /app/publish /p:UseAppHost=false

# 最終ステージ
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV PORT 8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "package.dll"]
