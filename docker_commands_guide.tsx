import React, { useState } from 'react';
import { Search, Terminal, Download, Play, Square, Trash2, Settings, Network, Database, FileText, Copy, CheckCircle, Lightbulb } from 'lucide-react';

const DockerGuide = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedCommand, setCopiedCommand] = useState('');

  const dockerCommands = [
    // Basic Commands
    {
      category: 'basic',
      command: 'docker --version',
      simpleExample: 'docker --version',
      whatHappens: 'Shows something like "Docker version 20.10.7"',
      explain5yo: '🔍 Like asking "What version of this toy am I playing with?" - it tells you which Docker you have installed.',
      whenToUse: 'When you want to check if Docker is installed and what version it is'
    },
    {
      category: 'basic',
      command: 'docker help',
      simpleExample: 'docker help',
      whatHappens: 'Shows a list of all Docker commands you can use',
      explain5yo: '📚 Like opening an instruction manual - it shows you all the commands you can use with Docker.',
      whenToUse: 'When you forget what commands are available or need help'
    },
    {
      category: 'basic',
      command: 'docker info',
      simpleExample: 'docker info',
      whatHappens: 'Shows detailed information about your Docker system',
      explain5yo: '📊 Like getting a report card for Docker - it tells you how many containers are running, how much space is used, etc.',
      whenToUse: 'When you want to see the health and status of your Docker system'
    },

    // Image Commands
    {
      category: 'images',
      command: 'docker images',
      simpleExample: 'docker images',
      whatHappens: 'Shows a table of all images on your computer like:\nREPOSITORY   TAG     IMAGE ID     CREATED     SIZE\nnginx        latest  f6d0b4767a6c 2 days ago  133MB',
      explain5yo: '📋 Like looking at your toy box - it shows you all the "app templates" (images) you have downloaded.',
      whenToUse: 'When you want to see what images you have available to run'
    },
    {
      category: 'images',
      command: 'docker pull',
      simpleExample: 'docker pull nginx',
      whatHappens: 'Downloads the nginx web server image from the internet. You\'ll see progress bars like:\nUsing default tag: latest\nlatest: Pulling from library/nginx\nDownload complete',
      explain5yo: '⬇️ Like downloading a new game from the app store - it gets the "nginx web server app" ready to use.',
      whenToUse: 'When you want to download a new app/service before running it'
    },
    {
      category: 'images',
      command: 'docker build',
      simpleExample: 'docker build -t my-website .',
      whatHappens: 'Creates a new image from your code. Shows steps like:\nStep 1/5: FROM nginx\nStep 2/5: COPY index.html /usr/share/nginx/html/\nSuccessfully built abc123',
      explain5yo: '🏗️ Like building a custom toy from instructions - it takes your code and makes it into a runnable app.',
      whenToUse: 'When you want to package your own code into a Docker image'
    },
    {
      category: 'images',
      command: 'docker rmi',
      simpleExample: 'docker rmi nginx',
      whatHappens: 'Deletes the nginx image from your computer. Shows:\nUntagged: nginx:latest\nDeleted: sha256:f6d0b4767a6c...',
      explain5yo: '🗑️ Like throwing away a toy you don\'t need anymore - it removes the image to save space.',
      whenToUse: 'When you want to free up space by removing unused images'
    },

    // Container Commands
    {
      category: 'containers',
      command: 'docker run',
      simpleExample: 'docker run -d -p 8080:80 nginx',
      whatHappens: 'Starts a web server! Returns a long ID like:\nab12cd34ef56...\nNow you can visit http://localhost:8080 and see a website!',
      explain5yo: '🚀 Like taking a toy out of the box and starting to play with it - it starts the nginx web server and you can visit it in your browser!',
      whenToUse: 'This is the most important command - use it to start any app/service'
    },
    {
      category: 'containers',
      command: 'docker ps',
      simpleExample: 'docker ps',
      whatHappens: 'Shows running containers:\nCONTAINER ID   IMAGE   COMMAND   CREATED   STATUS   PORTS   NAMES\nab12cd34ef56   nginx   "nginx"   2 min ago Up 2 min 0.0.0.0:8080->80/tcp   amazing_tesla',
      explain5yo: '👀 Like looking around your playroom to see which toys are currently being played with.',
      whenToUse: 'When you want to see what containers are currently running'
    },
    {
      category: 'containers',
      command: 'docker stop',
      simpleExample: 'docker stop amazing_tesla',
      whatHappens: 'Stops the container gracefully. Shows:\namazing_tesla',
      explain5yo: '🛑 Like telling a toy to "please stop playing music" - it politely shuts down the container.',
      whenToUse: 'When you want to stop a running container nicely'
    },
    {
      category: 'containers',
      command: 'docker start',
      simpleExample: 'docker start amazing_tesla',
      whatHappens: 'Starts the stopped container again. Shows:\namazing_tesla',
      explain5yo: '▶️ Like pressing play on a toy that was paused - it starts the container again.',
      whenToUse: 'When you want to restart a container that was stopped'
    },
    {
      category: 'containers',
      command: 'docker rm',
      simpleExample: 'docker rm amazing_tesla',
      whatHappens: 'Completely removes the container. Shows:\namazing_tesla',
      explain5yo: '🗑️ Like putting a toy back in its box permanently - the container is gone (but you can make a new one from the same image).',
      whenToUse: 'When you want to completely remove a stopped container'
    },
    {
      category: 'containers',
      command: 'docker logs',
      simpleExample: 'docker logs amazing_tesla',
      whatHappens: 'Shows what the container has been doing:\n2023/07/08 10:30:45 [notice] nginx started\n2023/07/08 10:31:20 GET /index.html',
      explain5yo: '📝 Like reading a diary of what the toy has been doing - it shows all the messages from the container.',
      whenToUse: 'When something is broken and you want to see what went wrong'
    },
    {
      category: 'containers',
      command: 'docker exec',
      simpleExample: 'docker exec -it amazing_tesla /bin/bash',
      whatHappens: 'Opens a command prompt INSIDE the container. You\'ll see:\nroot@ab12cd34ef56:/#',
      explain5yo: '🚪 Like opening up a toy and looking inside - you can now type commands inside the running container.',
      whenToUse: 'When you want to explore inside a running container or fix something'
    },

    // Volume Commands
    {
      category: 'volumes',
      command: 'docker volume create',
      simpleExample: 'docker volume create my-data',
      whatHappens: 'Creates a storage space. Shows:\nmy-data',
      explain5yo: '📦 Like getting a special storage box that toys can share - multiple containers can use the same volume to store files.',
      whenToUse: 'When you want to create persistent storage that survives container restarts'
    },
    {
      category: 'volumes',
      command: 'docker volume ls',
      simpleExample: 'docker volume ls',
      whatHappens: 'Shows all storage volumes:\nDRIVER    VOLUME NAME\nlocal     my-data\nlocal     another-volume',
      explain5yo: '📋 Like checking your storage closet to see all the boxes you have.',
      whenToUse: 'When you want to see all the volumes you\'ve created'
    },
    {
      category: 'volumes',
      command: 'docker run with volume',
      simpleExample: 'docker run -d -v my-data:/data nginx',
      whatHappens: 'Starts nginx with the volume attached. Files saved in /data inside the container will be kept safe even if the container is deleted.',
      explain5yo: '🔗 Like connecting a toy to a special memory bank - anything the toy saves will be remembered even if you put the toy away.',
      whenToUse: 'When you want your app to remember data even after restarting'
    },

    // Network Commands
    {
      category: 'networks',
      command: 'docker network create',
      simpleExample: 'docker network create my-network',
      whatHappens: 'Creates a private network. Shows:\nmy-network',
      explain5yo: '🌐 Like creating a private walkie-talkie channel - containers on this network can talk to each other privately.',
      whenToUse: 'When you want containers to communicate with each other securely'
    },
    {
      category: 'networks',
      command: 'docker network ls',
      simpleExample: 'docker network ls',
      whatHappens: 'Shows all networks:\nNETWORK ID   NAME        DRIVER    SCOPE\nabc123       bridge      bridge    local\ndef456       my-network  bridge    local',
      explain5yo: '📡 Like checking all the walkie-talkie channels available for your toys to use.',
      whenToUse: 'When you want to see what networks are available'
    },

    // Compose Commands
    {
      category: 'compose',
      command: 'docker-compose up',
      simpleExample: 'docker-compose up',
      whatHappens: 'Starts multiple containers at once based on docker-compose.yml file. Shows:\nCreating network "myapp_default"\nCreating myapp_database_1\nCreating myapp_web_1',
      explain5yo: '🎪 Like setting up a whole circus at once - it starts multiple containers that work together (like a website + database).',
      whenToUse: 'When you want to start a complete application with multiple services'
    },
    {
      category: 'compose',
      command: 'docker-compose down',
      simpleExample: 'docker-compose down',
      whatHappens: 'Stops and removes all containers from the compose project. Shows:\nStopping myapp_web_1\nRemoving myapp_web_1',
      explain5yo: '🎪➡️📦 Like packing up the entire circus - it stops all the containers and cleans up.',
      whenToUse: 'When you want to completely shut down a multi-container application'
    },

    // System Commands
    {
      category: 'system',
      command: 'docker system prune',
      simpleExample: 'docker system prune',
      whatHappens: 'Removes unused containers, networks, images. Shows:\nDeleted Containers: 5\nDeleted Networks: 2\nTotal reclaimed space: 1.2GB',
      explain5yo: '🧹 Like cleaning your entire room - it throws away all the Docker stuff you\'re not using anymore.',
      whenToUse: 'When your computer is running out of space and you want to clean up'
    },
    {
      category: 'system',
      command: 'docker system df',
      simpleExample: 'docker system df',
      whatHappens: 'Shows how much space Docker is using:\nTYPE       TOTAL    ACTIVE   SIZE      RECLAIMABLE\nImages     5        2        1.2GB     800MB\nContainers 3        1        15MB      10MB',
      explain5yo: '📊 Like checking how much space your toys are taking up in your room.',
      whenToUse: 'When you want to see how much disk space Docker is using'
    },

    // Fun Examples
    {
      category: 'containers',
      command: 'docker run interactive',
      simpleExample: 'docker run -it ubuntu bash',
      whatHappens: 'Opens a Linux computer inside your computer! You\'ll see:\nroot@abc123:/# \nNow you can type Linux commands!',
      explain5yo: '💻 Like having a computer inside your computer - you can play with Linux commands safely!',
      whenToUse: 'When you want to experiment with Linux or test commands'
    },
    {
      category: 'containers',
      command: 'docker run with port',
      simpleExample: 'docker run -p 3000:80 nginx',
      whatHappens: 'Starts a web server you can visit at http://localhost:3000',
      explain5yo: '🌐 Like opening a door (port 3000) so people can visit your website!',
      whenToUse: 'When you want to make a service accessible from your browser'
    }
  ];

  const categories = {
    'all': { name: 'All Commands', icon: Terminal },
    'basic': { name: 'Basic', icon: Terminal },
    'images': { name: 'Images', icon: Download },
    'containers': { name: 'Containers', icon: Play },
    'volumes': { name: 'Volumes', icon: Database },
    'networks': { name: 'Networks', icon: Network },
    'compose': { name: 'Compose', icon: FileText },
    'system': { name: 'System', icon: Settings }
  };

  const filteredCommands = dockerCommands.filter(cmd => {
    const matchesCategory = selectedCategory === 'all' || cmd.category === selectedCategory;
    const matchesSearch = cmd.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cmd.explain5yo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const copyToClipboard = (command) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(''), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Docker Commands for Everyone! 🐳</h1>
        <p className="text-gray-600">Simple explanations with real examples - even a 5-year-old can understand!</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search commands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {Object.entries(categories).map(([key, { name, icon: Icon }]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                selectedCategory === key 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon className="inline mr-2 h-4 w-4" />
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Commands List */}
      <div className="space-y-6">
        {filteredCommands.map((cmd, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <code className="text-lg font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded">
                    {cmd.command}
                  </code>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {categories[cmd.category].name}
                  </span>
                </div>
                
                {/* 5-year-old explanation */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <div className="flex items-start">
                    <Lightbulb className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 font-medium">{cmd.explain5yo}</p>
                  </div>
                </div>

                {/* Simple example */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">📝 Try this:</h4>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded-md">
                    <code className="text-sm font-mono">{cmd.simpleExample}</code>
                  </div>
                </div>

                {/* What happens */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">✨ What happens:</h4>
                  <div className="bg-green-50 p-3 rounded-md">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">{cmd.whatHappens}</pre>
                  </div>
                </div>

                {/* When to use */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">🎯 When to use:</h4>
                  <p className="text-gray-600 text-sm">{cmd.whenToUse}</p>
                </div>
              </div>
              
              <button
                onClick={() => copyToClipboard(cmd.simpleExample)}
                className="p-2 text-gray-400 hover:text-blue-500 transition-colors ml-4"
                title="Copy command"
              >
                {copiedCommand === cmd.simpleExample ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCommands.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No commands found matching your search. 🤔</p>
        </div>
      )}

      {/* Quick Start Guide */}
      <div className="mt-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🚀 Quick Start Guide</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">🎯 Your First Docker Experience</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-blue-50 p-3 rounded">
                <p><strong>1.</strong> <code>docker run -d -p 8080:80 nginx</code></p>
                <p className="text-gray-600">Starts a website at localhost:8080</p>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <p><strong>2.</strong> <code>docker ps</code></p>
                <p className="text-gray-600">See your running website</p>
              </div>
              <div className="bg-blue-50 p-3 rounded">
                <p><strong>3.</strong> <code>docker stop [container-name]</code></p>
                <p className="text-gray-600">Stop the website</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">🎪 Fun Things to Try</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-green-50 p-3 rounded">
                <p><strong>🐧 Linux Playground:</strong> <code>docker run -it ubuntu bash</code></p>
                <p className="text-gray-600">Play with Linux safely!</p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p><strong>🗂️ File Explorer:</strong> <code>docker exec -it [container] ls</code></p>
                <p className="text-gray-600">Look inside containers</p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p><strong>🧹 Clean Up:</strong> <code>docker system prune</code></p>
                <p className="text-gray-600">Clean up when done playing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DockerGuide;