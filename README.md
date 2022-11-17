# HiView<sub>DDRAM</sub>: Interactive visualization of the DNA Damage Response Assemblies Map
![](/docs/images/DDRAM_1-0_-_2022-11-13_19-31-38.png)

HiView<sub>DDRAM</sub> is an interactive webware for exploration of the DNA Damage Response Assemblies Map (DDRAM).

DDRAM is a data-driven, multi-scale map describing the organisation of 605 individual DDR proteins into 109 named assemblies, and the nested relationship between these assemblies.

The DDR Association Score (DAS) network is the integration of 114 input features of physical interaction, co-dependency, co-abundance, co-expression on a genome-wide scale. Protein assemblies in DDRAM, and the assignment of individual proteins to their respective assemblies, are the result of hierarchical clustering of the DAS network.

### Layout of HiView<sub>DDRAM</sub> has four main components: model and data view, search and control panel.
HiView<sub>DDRAM</sub> displays the hierarchical structure of DDRAM on the left panel in a _model view_ using a circle-packing layout, and the underlying DAS network in the right panel in the _data view_ using a network layout that corresponds to the circle-packing layout.

Below the data view is the _control panel_ where certain protein interactions and properties are under the users control. The control panel also contains the SHAP framework and convenience functions (copying protein names, exporting the current network as a vector image).

Proteins can be found through the  _search panel_. The search supports multiple proteins in the same search (space- or comma-separated); found proteins are distinguished by color).

Interactions in the DAS network can be explained using the SHAP scores.

There is an extensive help system in the form of a *guided tour*, *tool tips* and this *documentation*. The data view has a context-sensitive _legend_.

HiView<sub>DDRAM</sub> reads and displays data structures stored in NDEx. A toolkit and documentation exist to make the data structures representing multi-scale maps other than DDRAM and to upload them into NDEx for display in HiView<sub>DDRAM</sub>: [ddramutils](https://github.com/idekerlab/ddramutils).

## SHAP framework
A strength of HiView<sub>DDRAM</sub> is the ability to explain any interaction in the DAS network using SHAP scores. Simply selected any interaction in the DAS network. An explanation will appear below the controls of the _data view_.


Users can upload their own ontologies using the  and then view them on HiView. 


## Quick start guide for users
Go to http://hiview.ucsd.edu, and click the **EXAMPLES** button to select a pre-computed ontology. Press **START**, and you will be taken to a visualization of that ontology. 

![](https://raw.githubusercontent.com/idekerlab/hiview/master/docs/images/hiview-v15-step1.png)

HiView's visualization is separated into two panels (see screenshots below):

1. The Main Panel shows the ontology's hierarchical structure. This panel shows either a "circle-packing" diagram (the default) or a node-link diagram. The diagram that is shown can be switched in the Control Panel (see below).
   
1. The Side Panel shows the data that supports the hierarchical structure. To activate this panel, double-click on any subsystem node in the Main Panel.

### Main panel: Circle-packing diagram

In a circle-packing diagram, hierarchical relations are intuitively represented by drawing small circles nested within larger ones (like physical compartments of the cell).

![](https://raw.githubusercontent.com/idekerlab/hiview/master/docs/images/hiview-v15-cp.png)

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

----
&copy; 2017 - 2022 UC, San Diego Trey Ideker Lab

HiView Application is designed and implemented by Keiichiro Ono (kono ucsd edu).  
