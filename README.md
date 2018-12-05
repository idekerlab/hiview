# HiView (a universal viewer for hierarchical data)
![](https://raw.githubusercontent.com/idekerlab/hiview/master/docs/images/hiview-top-v15-1.png)

## What is HiView?
_HiView_ (http://hiview.ucsd.edu/) is a web application for visualizing hierarchical structure and the data that supports this structure. Hierarchical structure is stored and represented by a data structure called an ontology. 

Users can upload their own ontologies using the ddot Python package ([source code](https://github.com/michaelkyu/ddot) and [tutorial](https://github.com/michaelkyu/ddot/blob/master/examples/Tutorial.ipynb)) and then view them on HiView. 

## Updates
* 12/4/2018 - v1.5 release
* 6/11/2018 - v1 in beta
* 9/20/2017 - Updated for new version

## Publication
(TBD)

## Quick start guide for users
Go to http://hiview.ucsd.edu, and click the **EXAMPLES** button to select a pre-computed ontology. Press **START**, and you will be taken to a visualization of that ontology. 

![](https://raw.githubusercontent.com/idekerlab/hiview/master/docs/images/hiview-v15-step1.png)

HiView's visualization is separated into two panels (see screenshots below):

1. The Main Panel shows the ontology's hierarchical structure. This panel shows either a "circle-packing" diagram (the default) or a node-link diagram. The diagram that is shown can be switched in the Control Panel (see below).
   
1. The Side Panel shows the data that supports the hierarchical structure. To activate this panel, double-click on any subsystem node in the Main Panel.

### Main panel: Circle-packing diagram

In a circle-packing diagram, hierarchical relations are intuitively represented by drawing small circles nested within larger ones (like physical compartments of the cell).

![](https://raw.githubusercontent.com/idekerlab/hiview/master/docs/images/hiview-v15-cp.png)

### Main panel: Node-link diagram

In a node-link diagram, hierarchical relations are represented by directed edges and drawn compactly with a 2D layout algorithm.

![](https://raw.githubusercontent.com/idekerlab/hiview/master/docs/images/hiview-v15-nl.png)

### Side Panel: Interaction network diagram

The Side Panel allows you to visualize how data (in the form of gene-gene interaction networks) support the existence of each subsystem and their hierarchical organization. The Side Panel contains several visual components:

1. A gene-gene functional similarity network, consisting of genes in the selected subsytem
1. A histogram of the gene similarities
1. Checkboxes to toggle the visualization of other gene interaction types
1. A list of other attributes about the selected subsystem.

![](https://raw.githubusercontent.com/idekerlab/hiview/master/docs/images/hiview-v15-networkpanel.png)

### Control Panel

To open the Control Panel, double-click on the **"hamburger"** button at the top-left of the screen (i.e., the icon with three horizontal lines). The Control Panel allows the following configurations:

1. Switching between the circle-packing (the default diagram) and the node-link diagram.
1. Configuring the color of circles in the circle-packing diagram.
1. Configuring node size, label size, and edge thickness in the node-link diagram.
1. Enabling gene set enrichment analysis.

#### Options for Circle-Packing diagram

![](https://raw.githubusercontent.com/idekerlab/hiview/master/docs/images/hiview-v15-control1.png)

#### Options for Node-Link diagram

![](https://raw.githubusercontent.com/idekerlab/hiview/master/docs/images/hiview-v15-control2.png)

#### Automatic gene set enrichment analysys by Enrichr

When a user selects a subsystem, HiView can automatically perform gene set enrichment analysis using the [Enrichr](http://amp.pharm.mssm.edu/Enrichr/) web service.  By default, this option is turned off.  To enable this option, turn on the **Automatically run gene set analysis with Enricher** function in the Control Panel. Enrichment results are displayed on a separate bottom panel.

![](https://raw.githubusercontent.com/idekerlab/hiview/master/docs/images/hiview-v15-enrichment.png)

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

