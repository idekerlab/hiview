# HiView (a universal viewer for hierarchical data)
![](https://raw.githubusercontent.com/idekerlab/hiview/master/docs/images/hiview-top-v15-1.png)

![](https://raw.githubusercontent.com/idekerlab/hiview/master/docs/images/hiview-top-v15-2.png)

## What is HiView?
_HiView_ (http://hiview.ucsd.edu/) is a web application for visualizing hierarchical structure and the data that supports this structure. Hierarchical structure is stored and represented by a data structure called an ontology. 

Users can upload their own ontologies using the ddot Python package ([Source code](https://github.com/michaelkyu/ddot) and [Tutorial](https://github.com/michaelkyu/ddot/blob/master/examples/Tutorial.ipynb)) and then view them on HiView. 

## Updates
* 12/4/2018 - v1.5 release
* 6/11/2018 - v1 in beta
* 9/20/2017 - Updated for new version

## Publication
(TBD)

## Quick start guide for users
Go to http://hiview.ucsd.edu, and click the **EXAMPLES** button to select a pre-computed ontology. Press **START**, and you will be taken to a visualization of that ontology. 

![](https://raw.githubusercontent.com/idekerlab/hiview/master/docs/images/hiview-v15-step1.png)

There are two visualization components:

1. A main panel showing the ontology's hierarchical structure. This panel shows either a "circle-packing" diagram (the default) or a node-link diagram (see screenshots below). The type of diagram can be chosen by clicking the "Control Panel" button at the top-left.
   
1. A side panel showing the data that supports the hierarchical structure. To activate this panel, double-click on any subsystem node in the main panel.

### Screenshot of main panel: Circle-packing diagram 

![](https://raw.githubusercontent.com/idekerlab/hiview/master/docs/images/hiview-v15-cp.png)


### Screenshot of main panel: Node-link diagram

![](https://raw.githubusercontent.com/idekerlab/hiview/master/docs/images/hiview-v15-nl.png)

### Screenshot of Control Panel

![](https://raw.githubusercontent.com/idekerlab/hiview/master/docs/images/hiview-v15-control1.png)

![](https://raw.githubusercontent.com/idekerlab/hiview/master/docs/images/hiview-v15-control2.png)

To open the Control Panel, double-click on the button at the top-left of the screen (i.e., the icon with three horizontal lines). The Control Panel allows for switching between circle-packing and node-link diagrams. It also allows you to configure node size, label size, and edge thickness.

### Screenshot of side panel: Interaction network diagram

![](https://raw.githubusercontent.com/idekerlab/hiview/master/docs/images/hiview-v15-networkpanel.png)

This side panel contains many visualization subcomponents:

1. A gene-gene functional similarity network, consisting of pairs of genes in the selected subsytem
2. A histogram of the similarities
3. Checkboxes to toggle the visualization of different gene-gene interaction types
4. A list of other attributes about the selected subsystem.


### Options
All optional menu items are available in the Control Panel.  To open it, just ckick the **huburger menu** icon on the top-left top open the Control Panel.

#### Node-Link diagram
![](https://raw.githubusercontent.com/idekerlab/hiview/master/docs/images/hiview-v15-nodelink.png)

By default, the hierarchy is displayed using Circle Packing layout.  There is another viewer using Node-Link diagram.  To switch the view, use the viewer selector in the Control Panel.

#### Automatic gene set enrichment analysys by Enrichr

![](https://raw.githubusercontent.com/idekerlab/hiview/master/docs/images/hiview-v15-enrichment.png)

You can automatically send the member genes in the subsystem to [Enrichr](http://amp.pharm.mssm.edu/Enrichr/) to perform gene set enrichment analysis.  By default, this option is turned off.  To enable this option, turn on the **Automatically run gene set analysis with Enricher** function in the Control Panel.  Once you click any of the subsystems, the list of genes will be sent to the server and the analysys result will be displayed on the bottom panel.

----

## Quick Start for developers

HiView is implemented using [React](https://reactjs.org/)

1. Checkout this repository
1. Clone CyViewer module
1. yarn install
1. yarn link
1. In the frontend directory, run ```yarn link cy-viewer```
1. ```yarn start```

## Developer Documentation

(TBD)
* UX Design
* Architecture Design

## Roadmap

### V1 (Summer 2018)
* Support for small to medium size data
* Public data only
* Automatic enrichment analysis

### V2 (Fall 2018)
* Large data support
    * e.g., human dataset
* Private data support (for NDEx)
* 


## Developer's Guide
(TBD)

### Note


----
&copy; 2017 - 2018 UC, San Diego Trey Ideker Lab

HiView Application is designed and implemented by Keiichiro Ono (kono ucsd edu).  

[Data-Driven Ontology Toolkit (DDOT)](https://github.com/michaelkyu/ddot) is developed by Mike Yu 
